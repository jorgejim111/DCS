const DamageReportFormView = ({
  id,
  date,
  serial,
  product,
  line,
  inch,
  part,
  description,
  supervisor,
  operator,
  descriptionDr,
  explanation,
  sampleNet,
  supervisorExplanation,
  onClose
}) => {
  return (
    <>
      {/* Modal overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 print:bg-transparent">
        <div className="flex flex-col items-center w-full">
          {/* Área de impresión */}
          <div id="damage-report-form-print" className="bg-white" style={{ width: '80%', maxWidth: '7.5in', margin: '0 auto', boxSizing: 'border-box', padding: '0', overflow: 'visible', position: 'relative', display: 'block' }}>
            {/* Encabezado tipo ISO ajustado a hoja carta */}
            <div className="mb-4" style={{ width: '100%', maxWidth: '8.5in', margin: '0 auto' }}>
              <div
                className="grid border-2 border-black rounded-t-lg overflow-hidden"
                style={{
                  gridTemplateColumns: '1.2fr 1.2fr 1.2fr 1.2fr 1.2fr 1fr 1fr',
                  gridTemplateRows: '32px 32px 28px 28px 28px',
                  width: '8.1in',
                  minWidth: 0,
                  maxWidth: '8.1in',
                  margin: '0 auto',
                  boxSizing: 'border-box',
                }}
              >
                {/* Logo: columnas 1-2, filas 1-2 */}
                <div className="col-start-1 col-end-3 row-start-1 row-end-3 border-b border-black flex items-center justify-center bg-white">
                  <img src="/logo.jpg" alt="Logo" className="h-12 w-auto" />
                </div>
                {/* Form: columnas 3-5, fila 1 */}
                <div className="col-start-3 col-end-6 row-start-1 row-end-2 border-b border-l border-black flex items-center justify-center font-bold text-base bg-white">Form</div>
                {/* MAIF-12: columna 6, fila 1 */}
                <div className="col-start-6 col-end-7 row-start-1 row-end-2 border-b border-l border-black flex items-center justify-center font-bold bg-white">MAIF-12</div>
                {/* P: 1 of 1: columna 7, fila 1 */}
                <div className="col-start-7 col-end-8 row-start-1 row-end-2 border-b border-l border-black flex items-center justify-center bg-white">P: 1 of 1</div>
                {/* Die Quality/Damage Report: columnas 3-7, filas 2-5 */}
                <div className="col-start-3 col-end-7 row-start-2 row-end-6 border-b border-l border-black flex items-center justify-center font-bold text-2xl bg-white text-center">Die Quality/Damage Report</div>
                {/* Rev: 7 / 20-Dec: columna 7, filas 2-5 */}
                <div className="col-start-7 col-end-8 row-start-2 row-end-6 border-b border-l border-black flex flex-col items-center justify-center bg-white text-sm">
                  <span>Rev: 7</span>
                  <span>20-Dec</span>
                </div>
                {/* Originator: columnas 1-2, fila 3 */}
                <div className="col-start-1 col-end-3 row-start-3 row-end-4 border-b border-black flex items-center justify-center bg-white text-xs">
                  Originator: <span className="ml-1 font-semibold">Dir of Technology</span>
                </div>
                {/* Review: columnas 1-2, fila 4 */}
                <div className="col-start-1 col-end-3 row-start-4 row-end-5 border-b border-black flex items-center justify-center bg-white text-xs">
                  Review: <span className="ml-1 font-semibold">Maint Mgr/TPM/Quality Mgr</span>
                </div>
                {/* Approval: columnas 1-2, fila 5 */}
                <div className="col-start-1 col-end-3 row-start-5 row-end-6 border-black flex items-center justify-center bg-white text-xs">
                  Approval: <span className="ml-1 font-semibold">Dir of Technology</span>
                </div>
              </div>
            </div>
            {/* Instrucciones */}
            <div className="mb-4 text-xs text-gray-700 bg-blue-50 border-b px-6 py-3" style={{ maxWidth: '8.1in', margin: '0 auto' }}>
              <ul className="list-disc pl-5 space-y-1">
                <li>If the die is removed from a production line due to quality/process/damage issue the <span className="font-bold">Extrusion Supervisor/designate</span> should fill out this report...</li>
                <li>Every day set up techs should inspect the suspect die with Maintenance Manager.</li>
                <li>When the die is scrapped or repaired, set up technician controls the status using the Die_Control_System.</li>
                <li>Senior Set up technician is responsible to keep the dies in CIRCULATION when stock are available.</li>
                <li>Set up technicians should box the new replacement die when stocks are available.</li>
                <li>The Senior Set up Technician is responsible use the Die_Control_System to request new replacement dies...</li>
              </ul>
            </div>
            {/* Sección de datos del reporte, layout igual al form */}
            <div className="mb-2 grid grid-cols-4 gap-4 text-sm" style={{ maxWidth: '8.1in', margin: '0 auto' }}>
              <div className="font-bold text-blue-900">ID Damage Report</div>
              <div>{id}</div>
              <div className="font-bold text-blue-900">Date</div>
              <div>{date}</div>
              <div className="font-bold text-blue-900">Serial #</div>
              <div>{serial}</div>
              <div className="font-bold text-blue-900">Product #</div>
              <div>{product}</div>
              <div className="font-bold text-blue-900">Line #</div>
              <div>{line}</div>
              <div className="font-bold text-blue-900">Inch</div>
              <div>{inch}</div>
              <div className="font-bold text-blue-900">Description</div>
              <div>{description}</div>
              <div className="font-bold text-blue-900">Part</div>
              <div>{part}</div>
              <div className="font-bold text-blue-900">Supervisor / Name</div>
              <div>{supervisor}</div>
              <div className="font-bold text-blue-900">Operator / Name</div>
              <div>{operator}</div>
            </div>
            {/* Campos largos en filas completas */}
            <div className="mb-2">
              <span className="font-bold text-red-600">Description of Damage (if the die was damaged)</span>
              <div style={{ maxWidth: '8.1in', margin: '0 auto' }}>{descriptionDr}</div>
            </div>
            <div className="mb-2">
              <span className="font-bold text-blue-900">Explanation of Damage</span>
              <div style={{ maxWidth: '8.1in', margin: '0 auto' }}>{explanation}</div>
            </div>
            <div className="mb-2">
              <span className="font-bold text-blue-900">Sample Net?</span>
              <div style={{ maxWidth: '8.1in', margin: '0 auto' }}>{sampleNet}</div>
            </div>
            <div className="mb-2">
              <span className="font-bold text-blue-900">Supervisor Explanation</span>
              <div className="whitespace-pre-line break-words" style={{ maxWidth: '8.1in', margin: '0 auto' }}>{supervisorExplanation}</div>
            </div>
          </div>
        </div>
        {/* Botones abajo, fuera del área imprimible */}
        <div className="flex justify-end items-center gap-2 w-full py-4 px-6 print:hidden" style={{ background: 'white' }}>
          <button className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-900 font-semibold" onClick={() => window.print()} style={{ minWidth: '90px' }}>Print</button>
          <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 font-semibold" onClick={onClose} style={{ minWidth: '90px' }}>Close</button>
        </div>
      </div>
      {/* CSS de impresión */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #damage-report-form-print, #damage-report-form-print * {
            visibility: visible !important;
          }
          #damage-report-form-print {
            position: absolute !important;
            left: 0;
            top: 0;
            width: 8.5in !important;
            max-width: 8.5in !important;
            min-width: 8.5in !important;
            margin: 0 !important;
            padding: 0.2in !important;
            box-sizing: border-box !important;
            background: white !important;
            overflow: hidden !important;
            height: 11in !important;
            min-height: 11in !important;
            max-height: 11in !important;
            z-index: 9999 !important;
            page-break-after: avoid !important;
            page-break-before: avoid !important;
          }
          @page {
            size: letter portrait;
            margin: 0;
          }
          html, body {
            width: 8.5in !important;
            height: 11in !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            overflow: hidden !important;
          }
        }
      `}</style>
    </>
  );
}

export default DamageReportFormView;
