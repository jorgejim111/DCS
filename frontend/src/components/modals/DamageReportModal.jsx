import React, { useEffect, useState } from 'react';
import useCirculationSerials from '../../hooks/useCirculationSerials';
import axios from 'axios';
import { getSerialDetailsForReport, createDamageReport } from '../../services/damageReportService';
import { getProducts } from '../../services/productService';
import { getLines } from '../../services/lineService';
import workerService from '../../services/workerService';
import { getDescriptionDrs } from '../../services/descriptionDrService';
import { getExplanations } from '../../services/explanationService';

const DamageReportModal = ({ onClose }) => {
  // Modo vista: true si se está consultando un DR existente
  const [isViewMode, setIsViewMode] = useState(false);
  // Estados para los campos

  const today = new Date().toISOString().slice(0, 10);
  const [nextId, setNextId] = useState('');
  const [searchId, setSearchId] = useState('');
  const [serialId, setSerialId] = useState('');
  const [serialInput, setSerialInput] = useState('');
  const { data: serials, loading: loadingSerials } = useCirculationSerials();
  const [inch, setInch] = useState('');
  const [part, setPart] = useState('');
  const [description, setDescription] = useState('');
  // Product & Line dropdowns
  const [products, setProducts] = useState([]);
  const [productInput, setProductInput] = useState('');
  const [productId, setProductId] = useState('');
  const [lines, setLines] = useState([]);
  const [lineInput, setLineInput] = useState('');
  const [lineId, setLineId] = useState('');
  // Validation
  const [errors, setErrors] = useState({});
  // Supervisor dropdown
  const [supervisors, setSupervisors] = useState([]);
  const [supervisorInput, setSupervisorInput] = useState('');
  const [supervisorId, setSupervisorId] = useState('');
  // Operator dropdown
  const [operators, setOperators] = useState([]);
  const [operatorInput, setOperatorInput] = useState('');
  const [operatorId, setOperatorId] = useState('');
  // Description of Damage dropdown
  const [descriptionsDr, setDescriptionsDr] = useState([]);
  const [descriptionDrInput, setDescriptionDrInput] = useState('');
  const [descriptionDrId, setDescriptionDrId] = useState('');
  // Explanation dropdown
  const [explanations, setExplanations] = useState([]);
  const [explanationInput, setExplanationInput] = useState('');
  const [explanationId, setExplanationId] = useState('');
  // Sample Net
  const [sampleNet, setSampleNet] = useState('');
  // Supervisor Explanation
  const [supervisorExplanation, setSupervisorExplanation] = useState('');


  // Obtener el siguiente ID Damage Report al abrir el modal
  useEffect(() => {
    axios.get('/api/damage-report/next/id', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => {
        // Si el backend devuelve el último ID registrado, sumamos 1 para mostrar el siguiente
        const next = Number(res.data.nextId);
        setNextId(isNaN(next) ? '(auto)' : String(next + 1));
      })
      .catch(() => setNextId('(auto)'));
    // Cargar productos activos
    getProducts()
      .then(data => setProducts(Array.isArray(data) ? data.filter(p => p.is_active) : [])) 
      .catch(() => setProducts([]));
    // Cargar líneas activas
    const token = localStorage.getItem('token');
    getLines(token)
      .then(data => setLines(Array.isArray(data) ? data.filter(l => l.is_active) : []))    
      .catch(() => setLines([]));
    // Cargar supervisores (position_id 1,2,3)
    workerService.getAll()
      .then(data => {
        setSupervisors(Array.isArray(data) ? data.filter(w => [1,2,3].includes(w.position_id) && w.is_active) : []); 
        setOperators(Array.isArray(data) ? data.filter(w => [1,2,3,4,5].includes(w.position_id) && w.is_active) : []); 
      })
      .catch(() => {
        setSupervisors([]);
        setOperators([]);
      });
    // Cargar Description of Damage
    getDescriptionDrs(token)
      .then(data => setDescriptionsDr(Array.isArray(data) ? data : []))
      .catch(() => setDescriptionsDr([]));
    // Cargar Explanation
    getExplanations(token)
      .then(data => setExplanations(Array.isArray(data) ? data : []))
      .catch(() => setExplanations([]));
  }, []);

  // Encontrar el serial seleccionado
  const selectedSerial = serials.find(s => String(s.id) === String(serialId));

  // Autollenar Inch, Part y Description al seleccionar serialInput válido
  useEffect(() => {
    const serialObj = serials.find(s => s.serial_number === serialInput);
    if (serialObj) {
      setSerialId(serialObj.id);
      getSerialDetailsForReport(serialObj.id)
        .then(res => {
          setInch(res.data.inch || '');
          setPart(res.data.part || '');
          setDescription(res.data.description || '');
        })
        .catch(() => {
          setInch('');
          setPart('');
          setDescription('');
        });
    } else {
      setSerialId('');
      setInch('');
      setPart('');
      setDescription('');
    }
  }, [serialInput, serials]);

  // Validar todos los campos obligatorios
  const validate = () => {
    const newErrors = {};
    // Serial
    const serialObj = serials.find(s => s.serial_number === serialInput);
    if (!serialInput || !serialObj) newErrors.serialId = 'Serial is required and must be valid';
    // Product
    const productObj = products.find(p => p.name === productInput);
    if (!productInput || !productObj) newErrors.productId = 'Product is required and must be valid';
    // Line
    const lineObj = lines.find(l => l.name === lineInput);
    if (!lineInput || !lineObj) newErrors.lineId = 'Line is required and must be valid';
    // Supervisor
    const supervisorObj = supervisors.find(s => s.name === supervisorInput);
    if (!supervisorInput || !supervisorObj) newErrors.supervisorId = 'Supervisor is required and must be valid';
    // Operator
    const operatorObj = operators.find(o => o.name === operatorInput);
    if (!operatorInput || !operatorObj) newErrors.operatorId = 'Operator is required and must be valid';
    // Description of Damage
    const descDrObj = descriptionsDr.find(d => d.name === descriptionDrInput);
    if (!descriptionDrInput || !descDrObj) newErrors.descriptionDrId = 'Description of Damage is required and must be valid';
    // Explanation
    const explanationObj = explanations.find(ex => ex.name === explanationInput);
    if (!explanationInput || !explanationObj) newErrors.explanationId = 'Explanation is required and must be valid';
    // Sample Net
    if (!sampleNet) newErrors.sampleNet = 'Sample Net is required';
    // Supervisor Explanation
    if (!supervisorExplanation.trim()) newErrors.supervisorExplanation = 'Supervisor explanation is required';
    setErrors(newErrors);
    // Set IDs for backend if valid
    if (serialObj) setSerialId(serialObj.id); else setSerialId('');
    if (productObj) setProductId(productObj.id); else setProductId('');
    if (lineObj) setLineId(lineObj.id); else setLineId('');
    if (supervisorObj) setSupervisorId(supervisorObj.id); else setSupervisorId('');
    if (operatorObj) setOperatorId(operatorObj.id); else setOperatorId('');
    if (descDrObj) setDescriptionDrId(descDrObj.id); else setDescriptionDrId('');
    if (explanationObj) setExplanationId(explanationObj.id); else setExplanationId('');
    return Object.keys(newErrors).length === 0;
  };


  // Buscar DR existente por ID (cuando se da click en Search)
  const handleSearch = async (e) => {
    e.preventDefault();
    // Permitir buscar por el ID ingresado en searchId
    const idToSearch = searchId || nextId;
    if (!idToSearch || idToSearch === '(auto)') return;
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`/api/damage-report/${idToSearch}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const dr = res.data;
      // Llenar los campos con los datos del DR (ajusta los nombres según tu backend)      
  setSerialInput(dr.serial_number || '');
  setProductInput(dr.product_name || dr.product || '');
  setLineInput(dr.line_name || dr.line || '');
  setInch(dr.inch || '');
  setPart(dr.part || '');
  setDescription(dr.die_description || dr.description || '');
  setSupervisorInput(dr.supervisor_name || dr.supervisor || '');
  setOperatorInput(dr.operator_name || dr.operator || '');
  setDescriptionDrInput(dr.description_dr || '');
  setExplanationInput(dr.explanation || '');
  setSampleNet(dr.if_sample === 1 ? 'Yes' : dr.if_sample === 0 ? 'No' : '');
  setSupervisorExplanation(dr.supervisor_explanation || dr.note || '');
  setIsViewMode(true);
  setErrors({});
    } catch (err) {
      setErrors({ search: 'Damage Report not found.' });
      setIsViewMode(false);
    }
  };

  // Guardar Damage Report en la base de datos
  const [saveStatus, setSaveStatus] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveStatus('');
    if (!validate()) return;
    try {
      // Armar el objeto de datos según la tabla
      const data = {
        die_serial_id: serialId || null,
        line_id: lineId || null,
        product_id: productId || null,
        operator_id: operatorId || null,
        supervisor_id: supervisorId || null,
        description_dr_id: descriptionDrId || null,
        explanation_id: explanationId || null,
        if_sample: sampleNet === 'Yes' ? 1 : 0,
        note: supervisorExplanation || null,
        status_id: 4 // ID correcto para "Open DR"
      };
      console.log('DamageReport POST data:', data);
      // Guardar Damage Report y obtener el ID
      const drResult = await createDamageReport(data);
      let damageReportId = drResult;
      // Si el backend devuelve un objeto con id, úsalo
      if (drResult && typeof drResult === 'object' && drResult.id) {
        damageReportId = drResult.id;
      }
      // Cambiar status del die_serial a 4 (Damage Report)
      try {
        // Obtener el die_serial completo
        const res = await axios.get(`/api/die-serial/${serialId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const serial = res.data;
        // Log para depuración
        console.log('die_serial a actualizar:', serial);
        // Enviar todos los campos requeridos junto con el nuevo status_id, usando 0 si algún campo es null
        await updateDieSerial(serialId, {
          serial_number: serial.serial_number,
          die_description_id: serial.die_description_id,
          status_id: 4,
          inner: serial.inner == null ? 0 : serial.inner,
          outer: serial.outer == null ? 0 : serial.outer,
          proudness: serial.proudness == null ? 0 : serial.proudness
        });
      } catch (err) {
        console.error('Error updating die_serial status:', err);
      }

      // Paso 3: Crear registro en die_serial_history
      try {
        // Importar aquí para evitar ciclos si es necesario
        const { createDieSerialHistory } = await import('../../services/dieSerialHistoryService');
        await createDieSerialHistory({
          die_serial_id: serialId,
          status_id: 4,
          note: supervisorExplanation || null,
          damage_report_id: damageReportId,
          observed_damage_id: descriptionDrId,
          performed_by: operatorId, // O supervisorId según tu lógica
          product_id: productId,
          line_id: lineId
        });
      } catch (err) {
        console.error('Error creating die_serial_history:', err);
      }

      setSaveStatus('Damage Report saved successfully!');
      setIsViewMode(true); // Opcional: pasar a modo vista tras guardar
      // Cerrar el modal tras guardar exitosamente
      setTimeout(() => {
        if (typeof onClose === 'function') onClose();
      }, 500); // Da tiempo a mostrar el mensaje de éxito brevemente
    } catch (err) {
      let msg = 'Error saving Damage Report.';
      if (err.response && err.response.data) {
        console.error('Backend error:', err.response.data);
        if (typeof err.response.data === 'string') msg += ' ' + err.response.data;
        else if (err.response.data.message) msg += ' ' + err.response.data.message;        
        else if (err.response.data.error) msg += ' ' + err.response.data.error;
        else msg += ' ' + JSON.stringify(err.response.data);
      }
      setSaveStatus(msg);
    }
  };

  // Función para imprimir solo el modal
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div
        id="damage-report-modal-print"
        className="bg-white rounded-lg shadow-lg w-full max-w-[816px] p-0 relative max-h-screen overflow-y-auto border-2 border-blue-900"
        style={{ width: '100%', minWidth: 0, maxWidth: '816px' }}
      >
        {/* Header ISO fiel: 7 columnas x 5 filas grid */}
        <div className="px-0 pt-6 pb-2">
          <div
            className="grid border-2 border-black rounded-t-lg overflow-hidden"
            style={{
              gridTemplateColumns: 'repeat(7, 1fr)',
              gridTemplateRows: '32px 32px 28px 28px 28px',
              width: '100%',
              minWidth: 0,
              maxWidth: '816px',
              margin: '0 auto',
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
        {/* Errores de validación */}
        {Object.keys(errors).length > 0 && (
          <div className="px-6 pt-4 pb-2">
            <ul className="text-red-600 text-xs list-disc pl-5">
              {Object.values(errors).map((err, i) => <li key={i}>{err}</li>)}
            </ul>
          </div>
        )}
        {/* Mensaje de guardado */}
        {saveStatus && (
          <div className={`px-6 pt-2 pb-2 text-xs font-bold ${saveStatus.includes('success') ? 'text-green-700' : 'text-red-700'}`}>{saveStatus}</div>                                        )}
  {/* Datos principales reacomodados en grid 4x3 */}
  <form className="px-6 py-4" onSubmit={handleSubmit} autoComplete="off">
          {/* ID Damage Report y Search */}
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div className="flex flex-row items-end gap-2">
              <div className="flex-1 flex flex-col">
                <label className="text-xs font-bold text-blue-900 mb-1">ID Damage Report</label>                                      <input
                  className="border px-2 py-1 rounded"
                  value={searchId}
                  onChange={e => setSearchId(e.target.value)}
                  placeholder={nextId || '(auto)'}
                  autoComplete="off"
                />
              </div>
              <button type="button" onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded shadow text-sm mb-1">Search</button>                   </div>
            <div className="flex flex-col">
              <label className="text-xs font-bold text-blue-900 mb-1">Date</label>
              <input className="border px-2 py-1 rounded bg-gray-100" value={today} disabled />                                   </div>
          </div>
          {/* Grid 4x3 para campos principales */}
          <div className="grid grid-cols-4 gap-4 mb-2">
            {/* Fila 1 */}
            <div className="col-span-2 flex flex-col">
              <label className="text-xs font-bold text-blue-900 mb-1">Serial # <span className="text-red-600">*</span></label>                                      <input
                className="border px-2 py-1 rounded"
                placeholder="Select serial..."
                value={serialInput}
                onChange={e => setSerialInput(e.target.value)}
                list="serial-list"
                autoComplete="off"
                required
              />
              <datalist id="serial-list">
                {serials
                  .filter(s => s.serial_number.toLowerCase().includes(serialInput.toLowerCase()))
                  .map(s => (
                    <option key={s.id} value={s.serial_number} />
                  ))}
              </datalist>
            </div>
            {/* Product Dropdown */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-blue-900 mb-1">Product # <span className="text-red-600">*</span></label>                                     <input
                className="border px-2 py-1 rounded"
                placeholder="Select product..."
                value={productInput}
                onChange={e => {
                  setProductInput(e.target.value);
                  const obj = products.find(p => p.name === e.target.value);
                  setProductId(obj ? obj.id : '');
                }}
                list="product-list"
                autoComplete="off"
                required
              />
              <datalist id="product-list">
                {products
                  .filter(p => p.name.toLowerCase().includes(productInput.toLowerCase()))  
                  .map(p => (
                    <option key={p.id} value={p.name} />
                  ))}
              </datalist>
            </div>
            {/* Line Dropdown */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-blue-900 mb-1">Line # <span className="text-red-600">*</span></label>                                    <input
                className="border px-2 py-1 rounded"
                placeholder="Select line..."
                value={lineInput}
                onChange={e => {
                  setLineInput(e.target.value);
                  const obj = lines.find(l => l.name === e.target.value);
                  setLineId(obj ? obj.id : '');
                }}
                list="line-list"
                autoComplete="off"
                required
              />
              <datalist id="line-list">
                {lines
                  .filter(l => l.name.toLowerCase().includes(lineInput.toLowerCase()))     
                  .map(l => (
                    <option key={l.id} value={l.name} />
                  ))}
              </datalist>
            </div>
            {/* Fila 2 */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-blue-900 mb-1">Inch <span className="text-red-600">*</span></label>                                  <input className="border px-2 py-1 rounded bg-gray-100" value={inch} placeholder="Auto..." disabled />                                                                              </div>
            <div className="flex flex-col">
              <label className="text-xs font-bold text-blue-900 mb-1">Description <span className="text-red-600">*</span></label>                               <input className="border px-2 py-1 rounded bg-gray-100" value={description} placeholder="Auto..." disabled />                                                                       </div>
            <div className="col-span-2 flex flex-col">
              <label className="text-xs font-bold text-blue-900 mb-1">Supervisor / Name <span className="text-red-600">*</span></label>                         <input
                className="border px-2 py-1 rounded"
                placeholder="Select supervisor..."
                value={supervisorInput}
                onChange={e => {
                  setSupervisorInput(e.target.value);
                  const obj = supervisors.find(s => s.name === e.target.value);
                  setSupervisorId(obj ? obj.id : '');
                }}
                list="supervisor-list"
                autoComplete="off"
                required
              />
              <datalist id="supervisor-list">
                {supervisors
                  .filter(s => s.name.toLowerCase().includes(supervisorInput.toLowerCase()))
                  .map(s => (
                    <option key={s.id} value={s.name} />
                  ))}
              </datalist>
            </div>
            {/* Fila 3 */}
            <div className="col-span-2 flex flex-col">
              <label className="text-xs font-bold text-blue-900 mb-1">Part <span className="text-red-600">*</span></label>                                  <input className="border px-2 py-1 rounded bg-gray-100" value={part} placeholder="Auto..." disabled />                                                                              </div>
            <div className="col-span-2 flex flex-col">
              <label className="text-xs font-bold text-blue-900 mb-1">Operator # / Name <span className="text-red-600">*</span></label>                         <input
                className="border px-2 py-1 rounded"
                placeholder="Select operator..."
                value={operatorInput}
                onChange={e => {
                  setOperatorInput(e.target.value);
                  const obj = operators.find(o => o.name === e.target.value);
                  setOperatorId(obj ? obj.id : '');
                }}
                list="operator-list"
                autoComplete="off"
                required
              />
              <datalist id="operator-list">
                {operators
                  .filter(o => o.name.toLowerCase().includes(operatorInput.toLowerCase())) 
                  .map(o => (
                    <option key={o.id} value={o.name} />
                  ))}
              </datalist>
            </div>
          </div>
          {/* Campos de descripción y explicación */}
          <div className="px-6 pb-2">
          <div className="mb-2">
            <label className="text-xs font-bold text-red-600">Description of Damage (if the die was damaged) *</label>                                                                            <input
              className="border px-2 py-1 rounded w-full"
              placeholder="Select description..."
              value={descriptionDrInput}
              onChange={e => {
                setDescriptionDrInput(e.target.value);
                const obj = descriptionsDr.find(d => d.name === e.target.value);
                setDescriptionDrId(obj ? obj.id : '');
              }}
              list="description-dr-list"
              autoComplete="off"
              required
            />
            <datalist id="description-dr-list">
              {descriptionsDr
                .filter(d => d.name.toLowerCase().includes(descriptionDrInput.toLowerCase()))
                .map(d => (
                  <option key={d.id} value={d.name} />
                ))}
            </datalist>
          </div>
          <div className="mb-2 flex gap-4">
            <div className="flex-1">
              <label className="text-xs font-bold text-blue-900">Explanation of Damage *</label>                                                                                                    <input
                className="border px-2 py-1 rounded w-full"
                placeholder="Select explanation..."
                value={explanationInput}
                onChange={e => {
                  setExplanationInput(e.target.value);
                  const obj = explanations.find(ex => ex.name === e.target.value);
                  setExplanationId(obj ? obj.id : '');
                }}
                list="explanation-list"
                autoComplete="off"
                required
              />
              <datalist id="explanation-list">
                {explanations
                  .filter(ex => ex.name.toLowerCase().includes(explanationInput.toLowerCase()))
                  .map(ex => (
                    <option key={ex.id} value={ex.name} />
                  ))}
              </datalist>
            </div>
            <div className="flex flex-col w-40">
              <label className="text-xs font-bold text-blue-900">Sample Net? *</label>     
              <select
                className="border px-2 py-1 rounded"
                value={sampleNet}
                onChange={e => setSampleNet(e.target.value)}
                required
              >
                <option value="">Select...</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
          <div className="mb-2">
            <label className="text-xs font-bold text-blue-900">Supervisor Explanation *</label>                                                                                                   <textarea
              className="border px-2 py-1 rounded w-full"
              rows={3}
              maxLength={250}
              style={{ resize: 'vertical' }}
              placeholder="Enter supervisor explanation..."
              value={supervisorExplanation}
              onChange={e => setSupervisorExplanation(e.target.value)}
            />
          </div>
            {/* Botones */}
            <div className="flex justify-between items-center px-6 py-4 border-t bg-gray-50 print:hidden">
              {/* Mostrar Print solo en modo vista, Save solo en modo creación */}
              {isViewMode ? (
                <button type="button" onClick={handlePrint} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded shadow-lg text-lg">Print</button>
              ) : (
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded shadow-lg text-lg">Save Damage Report</button>
              )}
              <button type="button" onClick={onClose} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded shadow-lg text-lg">Exit</button>
            </div>
          </div>
        </form>
      </div>
      {/* Estilos para impresión solo del modal y formato A4 */}
      <style>{`
        @media print {
          html, body {
            min-height: 0 !important;
            height: auto !important;
            max-height: 100vh !important;
            margin: 0 !important;
            padding: 0 !important;
            box-sizing: border-box !important;
            width: 100% !important;
            overflow: hidden !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
          }
          #damage-report-modal-print {
            margin: 0 auto !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
            break-inside: avoid !important;
            overflow: hidden !important;
            box-shadow: none !important;
            padding-top: 0 !important;
            border: 2px solid #000 !important;
          }
          #damage-report-modal-print * {
            page-break-after: avoid !important;
            break-after: avoid !important;
            break-inside: avoid !important;
          }
          #damage-report-modal-print .grid {
            min-width: 0 !important;
            max-width: 180mm !important;
            width: 100% !important;
          }
          #damage-report-modal-print .text-2xl {
            font-size: 1.2rem !important;
          }
          #damage-report-modal-print .text-base {
            font-size: 0.9rem !important;
          }
          #damage-report-modal-print .text-xs {
            font-size: 0.7rem !important;
          }
          #damage-report-modal-print .p-0, #damage-report-modal-print .px-0, #damage-report-modal-print .py-0 {
            padding: 0 !important;
          }
          #damage-report-modal-print textarea {
            height: 2.5em !important;
            min-height: 2.5em !important;
            max-height: 2.5em !important;
            overflow: hidden !important;
            font-size: 0.8rem !important;
          }
          .print\\:hidden, .print\\:hidden * {
            display: none !important;
          }
          @page {
            size: Letter portrait;
            margin: 10mm;
          }
        }
      `}</style>
    </div>
  );
};

export default DamageReportModal;
