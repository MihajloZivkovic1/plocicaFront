import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { ChevronRight, Users } from 'lucide-react';
import Link from 'next/link';

interface Profile {
  id: string;
  name: string;
  qrCode: string;
}
interface Links {
  id: string,
  url: string,
  title: string
}

interface Group {
  id: string;
  name: string;
  profiles: Profile[];
  Links: Links[];
}

interface ProfileGroupsProps {
  groups: Group[];
}

const ProfileGroups: React.FC<ProfileGroupsProps> = ({ groups }) => {
  if (!groups.length) {
    return null;
  }

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {groups.map((group) => (
        <Card key={group.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gray-50 rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                {group.name}
              </h3>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {group.Links.map((linkOfGroup) => {
                return (
                  <div className="flex items-center space-x-2" key={linkOfGroup.id}>
                    <li key={linkOfGroup.id} className="flex justify-between items-center">
                      <a
                        href={linkOfGroup.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {linkOfGroup.title}
                      </a>
                    </li>
                  </div>
                );
              })}
            </div>

          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProfileGroups;