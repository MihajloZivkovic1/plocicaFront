import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea'
import { MessageAlert } from "@/components/ui/MessageAlert";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
type Profile = {
  profile: {
    profileName: string;
    dateOfBirth: string | null;
    dateOfDeath: string | null;
    religion: string;
    placeOfBirth: string;
    placeOfDeath: string;
    text: string;
    photo: string | File;
  };
};

type FormDataType = {
  profileName: string;
  dateOfBirth: string;
  dateOfDeath: string;
  religion: string;
  placeOfBirth: string;
  placeOfDeath: string;
  text: string;
  photo: string | File;
};

export default function GeneralEdit({ id }: { id: string }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [canSubmit, setCanSubmit] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const [errors, setErrors] = useState({
    profileName: "",
    dateOfBirth: "",
    dateOfDeath: "",
    text: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    profileName: '',
    dateOfBirth: '',
    dateOfDeath: '',
    religion: '',
    placeOfBirth: '',
    placeOfDeath: '',
    text: '',
  })
  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch(`http://localhost:3000/profiles/profile/${id}`);
      const data = await res.json();
      setProfile(data);
      const newImageUrl = data.profile.photo;
      console.log(data.profile.photo);
      setPreviewImage(newImageUrl + '?v=' + new Date().getTime());
    }
    fetchProfile();
  }, [id]);

  useEffect(() => {
    if (profile) {
      setFormData({
        profileName: profile.profile.profileName || "",
        dateOfBirth: formatDateForInput(profile.profile.dateOfBirth) || "",
        dateOfDeath: formatDateForInput(profile.profile.dateOfDeath) || "",
        religion: profile.profile.religion || "",
        placeOfBirth: profile.profile.placeOfBirth || "",
        placeOfDeath: profile.profile.placeOfDeath || "",
        text: profile.profile.text || ""
      });

    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      if (name === "text" && value.length < 10) {
        newErrors.text = "Text must be at least 10 characters long.";
      } else if (name === "text" && value.length > 255) {
        newErrors.text = "Text must be less than 255 characters long.";
      } else {
        newErrors.text = "";
      }
      return newErrors;
    });
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = { profileName: "", dateOfBirth: "", dateOfDeath: "", text: "" };
    let isValid = true;

    if (formData.profileName.trim() === "") {
      newErrors.profileName = "Profile name is required.";
      isValid = false;
    }

    if (formData.dateOfBirth && formData.dateOfDeath && formData.dateOfBirth > formData.dateOfDeath) {
      newErrors.dateOfDeath = "Date of Birth cannot be later than Date of Death.";
      isValid = false;
    }

    // if (formData.text.length < 10) {
    //   newErrors.text = "Text must be at least 10 characters long.";
    //   isValid = false;
    // } else if (formData.text.length > 255) {
    //   newErrors.text = "Text must be less than 255 characters long.";
    //   isValid = false;
    // }

    setErrors(newErrors);
    return isValid;
  };


  const handleSaveChanges = async (e: React.FormEvent) => {
    setSuccessMessage("");
    e.preventDefault();

    if (!validateForm()) {
      setErrorMessage("Failed to update profile, please try again");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('profileName', formData.profileName);
      formDataToSend.append('dateOfBirth', formData.dateOfBirth);
      formDataToSend.append('dateOfDeath', formData.dateOfDeath);
      formDataToSend.append('religion', formData.religion);
      formDataToSend.append('placeOfBirth', formData.placeOfBirth);
      formDataToSend.append('placeOfDeath', formData.placeOfDeath);
      // formDataToSend.append('text', formData.text);

      if (photoFile) {
        formDataToSend.append('profileImage', photoFile);
      }

      const response = await fetch(`http://localhost:3000/profiles/edit/${id}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      setSuccessMessage("Profile updated successfully!");
      setErrorMessage("");
      setErrors({ profileName: "", dateOfBirth: "", dateOfDeath: "", text: "" });

    } catch (error: any) {
      console.error('Error updating profile:', error);
      console.log('There was an error updating the profile');
      setErrors(error.message);
      setSuccessMessage("");
    }
  };

  const formatDateForInput = (date: string | null) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // const formattedDateOfBirth = formatDateForInput(profile?.profile.dateOfBirth ?? "");


  return (

    <div className="flex flex-col items-center h-screen p-5">
      <form onSubmit={handleSaveChanges} className="grid gap-6 mb-6 w-full grid-cols-1 ">
        <div className="flex">
          <Avatar>
            <AvatarImage src={previewImage ?? 'default-image-url.jpg'} alt="User profile photo" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Button className="m-7" onClick={handleButtonClick} type='button'>
            Upload image
          </Button>
          <input
            type="file"
            name='profilePhoto'
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            accept="image/*"
          />
        </div>


        <label htmlFor='profileName'>First Name</label>
        <div className='flex'>
          <Input
            type="text"
            name="profileName"
            value={formData.profileName}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>

        {errors.profileName && <div className="text-red-500">{errors.profileName}</div>}
        <label htmlFor='dateOfBirth'>Date of Birth</label>
        <div className="flex">
          <Input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
          />
          {errors.dateOfBirth && <div className="text-red-500">{errors.dateOfBirth}</div>}
        </div>

        <label htmlFor='dateOfDeath'>Date of Death</label>
        <div className="flex">
          <Input
            type="date"
            name="dateOfDeath"
            value={formData.dateOfDeath}
            onChange={handleInputChange}
          />
        </div>
        {errors.dateOfDeath && <div className="text-red-500">{errors.dateOfDeath}</div>}


        <label htmlFor="religion">Religion</label>
        <Input
          type="text"
          name="religion"
          onChange={handleInputChange}
          value={formData.religion}

        />
        <label htmlFor="placeOfBirth">Place of birth</label>
        <Input
          type="text"
          name="placeOfBirth"
          onChange={handleInputChange}
          value={formData.placeOfBirth}

        />
        <label htmlFor="placeOfDeath">Place of death</label>
        <Input
          type="text"
          value={formData.placeOfDeath}
          onChange={handleInputChange}
          name="placeOfDeath"

        />
        {/* <label htmlFor="text">Text</label>
        <Textarea
          value={formData.text}
          onChange={handleInputChange}
          name='text'
        ></Textarea> */}


        <div className=''>
          <Button type='submit'>Save Changes</Button>
        </div>
        <MessageAlert type="success" message={successMessage} />
        <MessageAlert type="error" message={errorMessage} />
      </form>
    </div>
  );
}