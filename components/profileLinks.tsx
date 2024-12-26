import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Edit2, Save, Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Loader } from "@/components/ui/loader";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";

interface Link {
  id: string;
  url: string;
  title: string;
}

interface Group {
  id: string;
  name: string;
  Links: Link[];
}

const API_BASE_URL = "https://plocicaapi.onrender.com";

const AddGroupForm: React.FC<{ onAddGroup: (name: string) => void; isLoading: boolean }> = ({ onAddGroup, isLoading }) => {
  const [groupName, setGroupName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (groupName.trim()) {
      onAddGroup(groupName.trim())
      setGroupName('')
    }
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Add New Group</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Naziv Kategorije linkova (Muzika, Knjige..)"
            className="flex-grow"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader className="mr-2" /> : null}
            Add Group
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

const AddLinkForm: React.FC<{
  groupId: string;
  onAddLink: (groupId: string, title: string, url: string) => void;
  onCancel: () => void;
  isLoading: boolean;
}> = ({
  groupId,
  onAddLink,
  onCancel,
  isLoading,
}) => {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (title.trim() && url.trim()) {
        onAddLink(groupId, title.trim(), url.trim());
        setTitle("");
        setUrl("");
      }
    };

    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4 border-t pt-4">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Naziv Linka"
          disabled={isLoading}
        />
        <Input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL Linka"
          disabled={isLoading}
        />
        <div className="flex justify-between gap-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader className="mr-2" /> : null}
            Add Link
          </Button>
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
        </div>
      </form>
    );
  };

const ProfileLinks: React.FC<{ id: string | undefined }> = ({ id }) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [editingLink, setEditingLink] = useState<{ groupId: string; linkId: string } | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [addLinkGroupId, setAddLinkGroupId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingGroup, setIsAddingGroup] = useState(false);
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // State for confirmation modals
  const [showDeleteGroupModal, setShowDeleteGroupModal] = useState(false);
  const [showDeleteLinkModal, setShowDeleteLinkModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ groupId: string; linkId?: string } | null>(null);


  useEffect(() => {
    if (id) {
      fetchGroups(id);
    } else {
      setIsLoading(false);
      setError("No profile ID provided");
    }
  }, [id]);

  const fetchGroups = async (profileId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/groups/${profileId}`);
      if (response.ok) {
        const data = await response.json();

        console.log('data with groups', data)
        if (Array.isArray(data.groups)) {
          setGroups(data.groups);
        } else {
          setGroups([]);
          console.warn("No groups found for this user");
        }
      } else {
        throw new Error(`API Error: ${response.statusText}`);

      }
    } catch (error) {
      console.error("Error fetching groups:", error);
      setError('Failed to load groups. Please try again later.');
      toast({
        title: "Error",
        description: "Failed to load groups. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addGroup = async (name: string) => {
    if (!id) {
      setError('No profile ID available to add group');
      toast({
        title: "Error",
        description: "No profile ID available to add group",
        variant: "destructive",
      });
      return;
    }
    setIsAddingGroup(true);
    try {
      const response = await fetch(`${API_BASE_URL}/groups/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        const newGroup = await response.json();
        setGroups((prevGroups) => [...prevGroups, newGroup.group]);
        toast({
          title: "Success",
          description: "Group added successfully",
        });
      } else {
        throw new Error('Failed to add group');
      }
    } catch (error) {
      console.error("Error adding group:", error);
      setError('Failed to add group. Please try again.');
      toast({
        title: "Error",
        description: "Failed to add group. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAddingGroup(false);
    }
  };

  const deleteGroup = async (groupId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/groups/${groupId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setGroups((prevGroups) => prevGroups.filter((group) => group.id !== groupId));
        toast({
          title: "Success",
          description: "Group deleted successfully",
        });
      } else {
        throw new Error('Failed to delete group');
      }
    } catch (error) {
      console.error("Error deleting group:", error);
      setError('Failed to delete group. Please try again.');
      toast({
        title: "Error",
        description: "Failed to delete group. Please try again.",
        variant: "destructive",
      });
    } finally {
      setShowDeleteGroupModal(false);
      setItemToDelete(null);
    }
  };

  const addLink = async (groupId: string, title: string, url: string) => {
    setIsAddingLink(true);
    try {
      const response = await fetch(`${API_BASE_URL}/links/${groupId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, url }),
      });

      if (response.ok) {
        const newLink = await response.json();
        setGroups((prevGroups) =>
          prevGroups.map((group) =>
            group.id === groupId
              ? { ...group, Links: [...(group.Links || []), newLink.link] }
              : group
          )
        );
        setAddLinkGroupId(null);
        toast({
          title: "Success",
          description: "Link added successfully",
        });
      } else {
        throw new Error('Failed to add link');
      }
    } catch (error) {
      console.error("Error adding link:", error);
      setError('Failed to add link. Please try again.');
      toast({
        title: "Error",
        description: "Failed to add link. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAddingLink(false);
    }
  };

  const deleteLink = async (groupId: string, linkId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/links/${linkId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setGroups((prevGroups) =>
          prevGroups.map((group) =>
            group.id === groupId
              ? { ...group, Links: group.Links.filter((link) => link.id !== linkId) }
              : group
          )
        );
        toast({
          title: "Success",
          description: "Link deleted successfully",
        });
      } else {
        throw new Error('Failed to delete link');
      }
    } catch (error) {
      console.error("Error deleting link:", error);
      setError('Failed to delete link. Please try again.');
      toast({
        title: "Error",
        description: "Failed to delete link. Please try again.",
        variant: "destructive",
      });
    } finally {
      setShowDeleteLinkModal(false);
      setItemToDelete(null);
    }
  };

  const editLink = async (groupId: string, linkId: string, newTitle: string, newUrl: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/links/${linkId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, url: newUrl }),
      });

      if (response.ok) {
        setGroups((prevGroups) =>
          prevGroups.map((group) =>
            group.id === groupId
              ? {
                ...group,
                Links: group.Links.map((link) =>
                  link.id === linkId ? { ...link, title: newTitle, url: newUrl } : link
                ),
              }
              : group
          )
        );
        setEditingLink(null);
        toast({
          title: "Success",
          description: "Link updated successfully",
        });
      } else {
        throw new Error('Failed to edit link');
      }
    } catch (error) {
      console.error("Error editing link:", error);
      setError('Failed to edit link. Please try again.');
      toast({
        title: "Error",
        description: "Failed to edit link. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Loader className="w-8 h-8" /></div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Linkovi ka omiljenim sećanjima</h2>
      <AddGroupForm onAddGroup={addGroup} isLoading={isAddingGroup} />
      {groups.length === 0 ? (
        <div>No groups found. Add a new group to get started!</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <Card key={group.id} className="border-2 border-primary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{group.name}</CardTitle>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    setItemToDelete({ groupId: group.id });
                    setShowDeleteGroupModal(true);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {group.Links && group.Links.map((link) =>
                    editingLink?.linkId === link.id ? (
                      <li key={link.id} className="flex flex-col gap-2">
                        <Input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          placeholder="Edit title"
                        />
                        <Input
                          type="url"
                          value={editUrl}
                          onChange={(e) => setEditUrl(e.target.value)}
                          placeholder="Edit URL"
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={() =>
                              editLink(group.id, link.id, editTitle.trim(), editUrl.trim())
                            }
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => setEditingLink(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </li>
                    ) : (
                      <li key={link.id} className="flex justify-between items-center">
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {link.title}
                        </a>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setEditingLink({ groupId: group.id, linkId: link.id });
                              setEditTitle(link.title);
                              setEditUrl(link.url);
                            }}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setItemToDelete({ groupId: group.id, linkId: link.id });
                              setShowDeleteLinkModal(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </li>
                    )
                  )}
                </ul>
                {addLinkGroupId === group.id ? (
                  <AddLinkForm
                    groupId={group.id}
                    onAddLink={addLink}
                    onCancel={() => setAddLinkGroupId(null)}
                    isLoading={isAddingLink}
                  />
                ) : (
                  <Button
                    className="w-full mt-4"
                    variant="outline"
                    onClick={() => setAddLinkGroupId(group.id)}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Link
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <ConfirmationModal
        isOpen={showDeleteGroupModal}
        onClose={() => setShowDeleteGroupModal(false)}
        onConfirm={() => itemToDelete && deleteGroup(itemToDelete.groupId)}
        title="Delete Group"
        description="Are you sure you want to delete this group? This action cannot be undone."
      />
      <ConfirmationModal
        isOpen={showDeleteLinkModal}
        onClose={() => setShowDeleteLinkModal(false)}
        onConfirm={() => itemToDelete && itemToDelete.linkId && deleteLink(itemToDelete.groupId, itemToDelete.linkId)}
        title="Delete Link"
        description="Are you sure you want to delete this link? This action cannot be undone."
      />
    </div>
  );
};

export default ProfileLinks;

