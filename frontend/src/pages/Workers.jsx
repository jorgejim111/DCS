import React, { useEffect, useState } from "react";
import BaseTableAdvanced from "../components/BaseTableAdvanced";
import WorkerModal from "../components/modals/WorkerModal";
import workerService from "../services/workerService";

const schema = [
  { key: "name", label: "Name" },
  { key: "position", label: "Position" },
  { key: "user", label: "User" },
  { key: "is_active", label: "Status", type: "boolean" },
  { key: "created_at", label: "Created At", hideInTable: true },
  { key: "modified_at", label: "Modified At" },
];

export default function Workers() {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editWorker, setEditWorker] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWorkers = async () => {
    setLoading(true);
    const res = await workerService.getAll();
    setData(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  const handleAdd = () => {
    setEditWorker(null);
    setModalOpen(true);
  };

  const handleEdit = (worker) => {
    setEditWorker(worker);
    setModalOpen(true);
  };

  const handleSave = async (worker) => {
    if (worker.id) {
      await workerService.update(worker.id, worker);
    } else {
      await workerService.create(worker);
    }
    setModalOpen(false);
    fetchWorkers();
  };

  const handleToggleActive = async (worker) => {
    await workerService.update(worker.id, {
      name: worker.name,
      position_id: worker.position_id,
      user_id: worker.user_id,
      is_active: !worker.is_active,
    });
    fetchWorkers();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Workers</h2>
      <BaseTableAdvanced
        schema={schema}
        data={data}
        onAdd={handleAdd}
        onEdit={handleEdit}
        loading={loading}
        onToggleActive={handleToggleActive}
      />
      {modalOpen && (
        <WorkerModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          worker={editWorker}
        />
      )}
    </div>
  );
}
