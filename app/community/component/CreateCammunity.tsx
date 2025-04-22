"use client";
import { Button } from "@radix-ui/themes";
import axios from "axios";
import { CloudUploadIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FormEvent, useEffect, useRef, useState} from "react";
import toast from "react-hot-toast";

interface Friend {
  name?: string;
  user_name?: string;
  user_photo?:string;
  email?: string;
  password?: string;
  confirm_password?: string;
}

function CreateCammunity() {
  const [groupName, setGroupName] = useState<string>("");
  const [audience, setAudience] = useState<"Public" | "Private">("Public");

  const [description, setDescription] = useState<string>("");
  const [friendData, setFriendData] = useState<Friend[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { data } = useSession();
  //  Group Photo
  const fileInRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File|null>(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  useEffect(() => {
    if (file) {
      const data = new FormData();
      data.set("file", file);
      fetch("/api/files", {
        method: "POST",
        body: data,
      }).then(response => {
        response.json().then(url => {
          setAvatarUrl(url);
        });
      });
    }
  }, [file]);

  //
  const handleSelect = (name: string) => {
    if (selectedFriends.includes(name)) {
      const updated = selectedFriends?.filter((n) => n !== name);
      setSelectedFriends(updated);
    } else {
      const updated = [...selectedFriends, name];
      setSelectedFriends(updated);
    }
  };

  const filteredFriends = friendData.filter((friend) =>
friend?.name?.toLowerCase().includes(searchTerm.toLowerCase())  );

  useEffect(() => {
    const fetchFriendData = async () => {
      try {
        const response = await axios.get<Friend[]>(
          `/api/follow`
        );
        setFriendData(response.data);
      } catch (error) {
        console.error("Error fetching friend data:", error);
      }
    };
    if (data?.user?.email) {
      fetchFriendData();
    }
  }, [data?.user?.email]);

  const handleCommunityCreate = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const baseUsername = `${groupName
      .toLowerCase()
      .replace(/\s+/g, "-")}-${Date.now()}`;
    console.log(baseUsername, "baseUsername");
    if (data?.user?.email === undefined) return alert("Please login first");
    const newCommunity = await axios.post(
      `${process.env.NEXTAUTH_URL}/api/community/${data?.user?.email}`,
      {
        group_name: groupName,
        group_picture: avatarUrl,
        audience: audience,
        members: selectedFriends,
        description: description,
        email: data?.user?.email,
        user_name: baseUsername,
      }
    );
    if (newCommunity.status === 201) {
      (document.getElementById("create_group") as HTMLDialogElement)?.close();
      toast.success(newCommunity.data.message);
    } else {
      toast.error("Error creating community");
    }
  };

  return (
    <dialog id="create_group" className="modal modal-middle">
      <form
        onSubmit={handleCommunityCreate}
        className="fixed inset-0 flex justify-center items-center p-4"
      >
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
          <button
            type="button"
            onClick={() =>  (document.getElementById("create_group") as HTMLDialogElement)?.close()}
            className="text-gray-500 hover:text-gray-700 absolute top-3 right-3"
          >
            ✕
          </button>
          <h2 className="text-xl font-semibold mb-4">Create Group</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600">Group name</label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 mt-1"
                placeholder="Add Group name here"
              />
            </div>
            <input type="hidden" name="avatar" value={avatarUrl || ''}/>
      <div className="flex gap-4 items-center">
        <div>
          <div className="bg-gray-400 size-24 rounded-full overflow-hidden aspect-square shadow-md shadow-gray-400">
            <Image className="" src={avatarUrl || 'https://placehold.co/32'} width={400} height={400} alt=""/>
          </div>
        </div>
        <div>
          <input type="file"
                 ref={fileInRef}
                 className="hidden"
                 onChange={ev => setFile(ev.target.files?.[0] || null)}
          />
          <Button
            type="button"
            variant="surface"
            className="flex gap-1 items-center bg-blue-400 px-3 py-2 rounded-md text-gray-100 hover:bg-blue-500 duration-500"
            onClick={() => fileInRef.current?.click()}
          >
            <CloudUploadIcon/>
            Upload avatar
          </Button>
        </div>
      </div>

            <div>
              <label className="block text-gray-600">Select audience</label>
              <div className="flex space-x-4 mt-1">
                {(["Public", "Private"] as const).map((type) => (
                  <label key={type} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value={type}
                      className="accent-blue-700"
                      checked={audience === type}
                      onChange={() => setAudience(type)}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="relative">
              <label className="block text-gray-600">Invite friends</label>
              <div
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full cursor-pointer text-sm mt-2 p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
              >
                {selectedFriends.length > 0
                  ? selectedFriends.join(", ")
                  : "Select friends"}
              </div>

              {showDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full p-2 border-b border-gray-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {filteredFriends.length > 0 ? (
                    filteredFriends.map((friend, index) => (
                      <div
                        key={index}
                        className={`p-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between ${
                          selectedFriends.includes(friend?.name || "")
                            ? "bg-gray-200"
                            : ""
                        }`}
                        onClick={() => handleSelect(friend?.name||"")}
                      >
                        <span>{friend.name}</span>
                        {selectedFriends.includes(friend?.name||"") && (
                          <span className="text-green-500 font-bold">
                            &#10003;
                          </span>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="p-2 text-gray-500">No friends found</p>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-600">Group description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 mt-1 h-24"
                placeholder="Description here"
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button className="bg-green-500 text-white px-4 py-2 rounded">
                Create now
              </button>
            </div>
          </div>
        </div>
      </form>
    </dialog>
  );
}

export default CreateCammunity;
