import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

function DiagnosisDamageReportModal({ open, onClose, iddrData }) {
  const [photo1, setPhoto1] = useState(null);
  const [photo2, setPhoto2] = useState(null);
  const [desc1, setDesc1] = useState('');
  const [desc2, setDesc2] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [saving, setSaving] = useState(false);
  // Recibe el usuario que realiza el diagnóstico
  const performedBy = arguments[0]?.performedBy || 'Unknown';

  // Helper to open file dialog and load image
  const handlePhotoSelect = async (setPhoto) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = e => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = ev => setPhoto(ev.target.result);
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  // PDF generation
  const handleSavePDF = async () => {
    setSaving(true);
    const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'letter' });
    // Logo
    const logoImg = new Image();
    logoImg.src = '/logo.jpg';
    // Draw logo (async workaround)
    logoImg.onload = function() {
  doc.addImage(logoImg, 'JPEG', 40, 20, 120, 60);
  // Header
  doc.setFontSize(22);
  doc.text('Diagnosis Damage Report', 200, 60);
  doc.setFontSize(13);
  doc.text(`Damage Report: ${iddrData.id}`, 420, 40);
  doc.text(`Date: ${iddrData.date}`, 420, 60);
  // Más espacio entre segmentos
  let yStart = 90;
  // Die Info (blue header)
  doc.setFillColor(124,166,247);
  doc.rect(40, yStart, 520, 22, 'F');
  doc.setFontSize(12);
  doc.setTextColor(0,0,0);
  doc.text('Die Info', 270, yStart+15);
  doc.setTextColor(0,0,0);
  // Table Die Info
  doc.setDrawColor(0,0,0);
  doc.setLineWidth(1);
  doc.rect(40, yStart+22, 520, 50); // Outer box
  doc.line(40, yStart+42, 560, yStart+42); // Horizontal
  doc.line(40, yStart+62, 560, yStart+62);
  doc.line(180, yStart+22, 180, yStart+72); // Vertical
  doc.line(320, yStart+22, 320, yStart+72);
  doc.line(440, yStart+22, 440, yStart+72);
  doc.setFontSize(10);
  doc.text('Serial #', 50, yStart+37);
  doc.text(String(iddrData.serial_number || '-'), 120, yStart+37);
  doc.text('Die Description', 190, yStart+37);
  doc.text(String(iddrData.die_description || '-'), 330, yStart+37);
  doc.text('Die part #', 450, yStart+37);
  doc.text('-', 520, yStart+37);
  doc.text('Die (In)', 50, yStart+57);
  doc.text('-', 120, yStart+57);
  doc.text('Description', 190, yStart+57);
  doc.text(String(iddrData.description_dr || '-'), 330, yStart+57);
  // Issue Info (blue header)
  yStart += 82;
  doc.setFillColor(124,166,247);
  doc.rect(40, yStart, 520, 22, 'F');
  doc.setFontSize(12);
  doc.setTextColor(0,0,0);
  doc.text('Issue Info', 270, yStart+15);
  doc.setTextColor(0,0,0);
  // Table Issue Info
  doc.setDrawColor(0,0,0);
  doc.setLineWidth(1);
  doc.rect(40, yStart+22, 520, 65);
  doc.line(40, yStart+42, 560, yStart+42);
  doc.line(180, yStart+22, 180, yStart+87);
  doc.line(320, yStart+22, 320, yStart+87);
  doc.line(440, yStart+22, 440, yStart+87);
  doc.setFontSize(10);
  doc.text('Date', 50, yStart+37);
  doc.text(String(iddrData.date || '-'), 120, yStart+37);
  doc.text('Product #', 190, yStart+37);
  doc.text(String(iddrData.product_name || '-'), 330, yStart+37);
  doc.text('Line #', 450, yStart+37);
  doc.text(String(iddrData.line_name || '-'), 520, yStart+37);
  doc.text('Supervisor # / Name', 50, yStart+57);
  doc.text(String(iddrData.supervisor_name || '-'), 190, yStart+57);
  doc.text('Operator # / Name', 330, yStart+57);
  doc.text(String(iddrData.operator_name || '-'), 450, yStart+57);
  doc.text('Explanation', 50, yStart+77);
  doc.text(String(iddrData.explanation || '-'), 190, yStart+77);
      // Section: Damage Diagnosis
      doc.setFillColor(124,166,247);
      doc.rect(40, 210, 520, 20, 'F');
      doc.setFontSize(12);
      doc.setTextColor(0,0,0);
      doc.text('Damage Diagnosis', 250, 225);
      // Photos and descriptions
      let yPhoto = 240;
      if (photo1) {
        doc.addImage(photo1, 'JPEG', 50, yPhoto, 220, 80);
        doc.setFontSize(10);
        doc.text('Description Damage', 50, yPhoto+90);
        doc.text(desc1, 50, yPhoto+105, { maxWidth: 200 });
      }
      if (photo2) {
        doc.addImage(photo2, 'JPEG', 300, yPhoto, 220, 80);
        doc.setFontSize(10);
        doc.text('Description Damage', 300, yPhoto+90);
        doc.text(desc2, 300, yPhoto+105, { maxWidth: 200 });
      }
      // Section: Diagnosis Decision
      doc.setFillColor(124,166,247);
      doc.rect(40, yPhoto+130, 520, 20, 'F');
      doc.setFontSize(12);
      doc.text('Diagnosis Decision', 250, yPhoto+145);
      doc.setFontSize(10);
      doc.text(diagnosis, 50, yPhoto+165, { maxWidth: 500 });
      // Footer: Performance by
  doc.setFontSize(10);
  doc.text('Performance by', 50, 730);
  doc.setTextColor(0,0,255);
  doc.text(performedBy, 150, 730);
      // Save PDF
      const fileName = `DR ${iddrData.id}.pdf`;
      try {
        doc.save(fileName);
        alert('PDF generated. Please save it manually to the shared network folder: \\\\192.168.1.100\\diagnosis_reports\\');
      } catch (err) {
        alert('Error saving PDF: ' + err.message);
      }
      setSaving(false);
      if (onClose) onClose();
    };
    // If logo not loaded, fallback to drawing without logo
    if (logoImg.complete) logoImg.onload();
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl p-0 w-full max-w-3xl relative shadow-lg">
        <div className="flex items-start justify-between px-8 pt-6 pb-2 border-b">
          <div className="flex flex-col items-start">
            <img src="/logo.jpg" alt="Logo" className="h-12 mb-1" />
            <span className="text-xs text-[#0C2C65] font-bold">MasterNet Ltd.</span>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <span className="text-2xl font-bold text-[#0C2C65] leading-tight">Diagnosis Damage Report</span>
            <span className="text-lg text-[#264893] font-semibold">DR IDDR: {iddrData.id}</span>
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 text-[#264893] hover:text-red-600 text-2xl font-bold">×</button>
        </div>
        <div className="px-8 py-6">
          {/* Die Info & Issue Info */}
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <div className="text-xs font-bold text-[#264893] mb-1">Serial #</div>
              <div className="text-base text-[#0C2C65]">{iddrData.serial_number}</div>
            </div>
            <div>
              <div className="text-xs font-bold text-[#264893] mb-1">Die Description</div>
              <div className="text-base text-[#0C2C65]">{iddrData.die_description}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <div className="text-xs font-bold text-[#264893] mb-1">Product</div>
              <div className="text-base text-[#0C2C65]">{iddrData.product_name}</div>
            </div>
            <div>
              <div className="text-xs font-bold text-[#264893] mb-1">Line</div>
              <div className="text-base text-[#0C2C65]">{iddrData.line_name}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <div className="text-xs font-bold text-[#264893] mb-1">Supervisor</div>
              <div className="text-base text-[#0C2C65]">{iddrData.supervisor_name}</div>
            </div>
            <div>
              <div className="text-xs font-bold text-[#264893] mb-1">Operator</div>
              <div className="text-base text-[#0C2C65]">{iddrData.operator_name}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <div className="text-xs font-bold text-[#264893] mb-1">Description</div>
              <div className="text-base text-[#0C2C65]">{iddrData.description_dr}</div>
            </div>
            <div>
              <div className="text-xs font-bold text-[#264893] mb-1">Explanation</div>
              <div className="text-base text-[#0C2C65]">{iddrData.explanation}</div>
            </div>
          </div>
          {/* Photos */}
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div className="flex flex-col items-center">
              <div className="w-full h-32 border-2 border-[#7CA6F7] rounded-xl flex items-center justify-center bg-gray-100 cursor-pointer" onClick={() => handlePhotoSelect(setPhoto1)}>
                {photo1 ? <img src={photo1} alt="Foto 1" className="object-contain h-full w-full" /> : <span className="text-gray-400">Selecciona foto 1</span>}
              </div>
              <textarea className="w-full border-2 border-[#7CA6F7] rounded-xl p-2 mt-2 text-sm" rows={2} value={desc1} onChange={e => setDesc1(e.target.value)} placeholder="Explicación de la foto 1..." />
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full h-32 border-2 border-[#7CA6F7] rounded-xl flex items-center justify-center bg-gray-100 cursor-pointer" onClick={() => handlePhotoSelect(setPhoto2)}>
                {photo2 ? <img src={photo2} alt="Foto 2" className="object-contain h-full w-full" /> : <span className="text-gray-400">Selecciona foto 2</span>}
              </div>
              <textarea className="w-full border-2 border-[#7CA6F7] rounded-xl p-2 mt-2 text-sm" rows={2} value={desc2} onChange={e => setDesc2(e.target.value)} placeholder="Explicación de la foto 2..." />
            </div>
          </div>
          {/* Diagnosis Decision */}
          <div className="mb-4">
            <label className="text-xs font-bold text-[#264893] mb-1">Diagnosis Decision</label>
            <textarea className="w-full border-2 border-[#7CA6F7] rounded-xl p-2 text-sm" rows={3} value={diagnosis} onChange={e => setDiagnosis(e.target.value)} placeholder="Explicación completa del diagnóstico..." />
          </div>
          <div className="flex justify-end gap-4">
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded shadow-lg text-lg" disabled={saving} onClick={handleSavePDF}>Generar PDF</button>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded shadow-lg text-lg" onClick={onClose}>Salir</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiagnosisDamageReportModal;
