import React from "react";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import ProfileTabs from "../components/profile/ProfileTabs";

const userData = {
  name: "John Doe",
  role: "Senior Project Manager",
  department: "Project Management",
  email: "john.doe@company.com",
  phone: "+1 (555) 123-4567",
  location: "New York, USA",
  joinDate: "Jan 2022",
  accessLevel: "Administrator",
  avatar: "/path/to/avatar.jpg",
};

export function Profile() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <ProfileHeader user={userData} />
      <ProfileStats />
      <ProfileTabs />
    </div>
  );
}
