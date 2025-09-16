import React, { useEffect, useState } from "react";
import BaseTableAdvanced from "../components/BaseTableAdvanced";
import UserModal from "../components/modals/UserModal";
import userService from "../services/userService";

const schema = [
  { key: "username", label: "Username" },
  { key: "role", label: "Role" },
];

export default function Users() {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await userService.getAll();
    setData(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = () => {
    setEditUser(null);
    setModalOpen(true);
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setModalOpen(true);
  };

  const handleSave = async (user) => {
    if (user.id) {
      await userService.update(user.id, user);
    } else {
      await userService.create(user);
    }
    setModalOpen(false);
    fetchUsers();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Users</h2>
      <BaseTableAdvanced
        schema={schema}
        data={data}
        onAdd={handleAdd}
        onEdit={handleEdit}
        loading={loading}
      />
      {modalOpen && (
        <UserModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          user={editUser}
        />
      )}
    </div>
  );
}
