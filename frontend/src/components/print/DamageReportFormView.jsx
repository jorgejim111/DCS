import React from 'react';

const DamageReportFormView = ({
  nextId,
  today,
  serialInput,
  productInput,
  lineInput,
  inch,
  description,
  part,
  supervisorInput,
  operatorInput,
  descriptionDrInput,
  explanationInput,
  sampleNet,
  supervisorExplanation
}) => (
  <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl p-0 border-2 border-blue-900">
    {/* Header ISO fiel: 7 columnas x 5 filas grid */}
    <div className="px-0 pt-6 pb-2">
      <div
        className="grid border-2 border-black rounded-t-lg overflow-hidden"
        style={{
          gridTemplateColumns: 'repeat(7, 1fr)',
          gridTemplateRows: '32px 32px 28px 28px 28px',
          minWidth: '900px',
        }}
      >
        <div className="col-start-1 col-end-3 row-start-1 row-end-3 border-b border-black flex items-center justify-center bg-white">
          <img src="/logo.jpg" alt="Logo" className="h-12 w-auto" />
        </div>
        <div className="col-start-3 col-end-6 row-start-1 row-end-2 border-b border-l border-black flex items-center justify-center font-bold text-base bg-white">Form</div>
        <div className="col-start-6 col-end-7 row-start-1 row-end-2 border-b border-l border-black flex items-center justify-center font-bold bg-white">MAIF-12</div>
        <div className="col-start-7 col-end-8 row-start-1 row-end-2 border-b border-l border-black flex items-center justify-center bg-white">P: 1 of 1</div>
        <div className="col-start-3 col-end-7 row-start-2 row-end-6 border-b border-l border-black flex items-center justify-center font-bold text-2xl bg-white text-center">Die Quality/Damage Report</div>
        <div className="col-start-7 col-end-8 row-start-2 row-end-6 border-b border-l border-black flex flex-col items-center justify-center bg-white text-sm">
          <span>Rev: 7</span>
          <span>20-Dec</span>
        </div>
        <div className="col-start-1 col-end-3 row-start-3 row-end-4 border-b border-black flex items-center justify-center bg-white text-xs">
          Originator: <span className="ml-1 font-semibold">Dir of Technology</span>
        </div>
        <div className="col-start-1 col-end-3 row-start-4 row-end-5 border-b border-black flex items-center justify-center bg-white text-xs">
          Review: <span className="ml-1 font-semibold">Maint Mgr/TPM/Quality Mgr</span>
        </div>
        <div className="col-start-1 col-end-3 row-start-5 row-end-6 border-black flex items-center justify-center bg-white text-xs">
          Approval: <span className="ml-1 font-semibold">Dir of Technology</span>
        </div>
      </div>
    </div>
    {/* Instrucciones */}
    <div className="px-6 py-3 text-xs text-gray-700 bg-blue-50 border-b">
      <ul className="list-disc pl-5 space-y-1">
        <li>If the die is removed from a production line due to quality/process/damage issue the <span className="font-bold">Extrusion Supervisor/designate</span> should fill out this report...</li>
        <li>Every day set up techs should inspect the suspect die with Maintenance Manager.</li>
        <li>When the die is scrapped or repaired, set up technician controls the status using the Die_Control_System.</li>
        <li>Senior Set up technician is responsible to keep the dies in CIRCULATION when stock are available.</li>
        <li>Set up technicians should box the new replacement die when stocks are available.</li>
        <li>The Senior Set up Technician is responsible use the Die_Control_System to request new replacement dies...</li>
      </ul>
    </div>
    {/* Datos principales reacomodados en grid 4x3 */}
    <div className="px-6 py-4">
      <div className="grid grid-cols-2 gap-4 mb-2">
        <div className="flex flex-row items-end gap-2">
          <div className="flex-1 flex flex-col">
            <label className="text-xs font-bold text-blue-900 mb-1">ID Damage Report</label>
            <div className="border px-2 py-1 rounded bg-gray-100">{nextId}</div>
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-bold text-blue-900 mb-1">Date</label>
            <div className="border px-2 py-1 rounded bg-gray-100">{today}</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-2">
        <div className="col-span-2 flex flex-col">
          <label className="text-xs font-bold text-blue-900 mb-1">Serial #</label>
          <div className="border px-2 py-1 rounded bg-gray-100">{serialInput}</div>
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-bold text-blue-900 mb-1">Product #</label>
          <div className="border px-2 py-1 rounded bg-gray-100">{productInput}</div>
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-bold text-blue-900 mb-1">Line #</label>
          <div className="border px-2 py-1 rounded bg-gray-100">{lineInput}</div>
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-bold text-blue-900 mb-1">Inch</label>
          <div className="border px-2 py-1 rounded bg-gray-100">{inch}</div>
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-bold text-blue-900 mb-1">Description</label>
          <div className="border px-2 py-1 rounded bg-gray-100">{description}</div>
        </div>
        <div className="col-span-2 flex flex-col">
          <label className="text-xs font-bold text-blue-900 mb-1">Supervisor / Name</label>
          <div className="border px-2 py-1 rounded bg-gray-100">{supervisorInput}</div>
        </div>
        <div className="col-span-2 flex flex-col">
          <label className="text-xs font-bold text-blue-900 mb-1">Part</label>
          <div className="border px-2 py-1 rounded bg-gray-100">{part}</div>
        </div>
        <div className="col-span-2 flex flex-col">
          <label className="text-xs font-bold text-blue-900 mb-1">Operator # / Name</label>
          <div className="border px-2 py-1 rounded bg-gray-100">{operatorInput}</div>
        </div>
      </div>
      <div className="mb-2">
        <label className="text-xs font-bold text-red-600">Description of Damage (if the die was damaged)</label>
        <div className="border px-2 py-1 rounded w-full bg-gray-100">{descriptionDrInput}</div>
      </div>
      <div className="mb-2 flex gap-4">
        <div className="flex-1">
          <label className="text-xs font-bold text-blue-900">Explanation of Damage</label>
          <div className="border px-2 py-1 rounded w-full bg-gray-100">{explanationInput}</div>
        </div>
        <div className="flex flex-col w-40">
          <label className="text-xs font-bold text-blue-900">Sample Net?</label>
          <div className="border px-2 py-1 rounded bg-gray-100">{sampleNet}</div>
        </div>
      </div>
      <div className="mb-2">
        <label className="text-xs font-bold text-blue-900">Supervisor Explanation</label>
        <div className="border px-2 py-1 rounded w-full bg-gray-100" style={{ minHeight: '48px' }}>{supervisorExplanation}</div>
      </div>
    </div>
  </div>
);

export default DamageReportFormView;
