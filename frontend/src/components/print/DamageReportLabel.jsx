import React from 'react';

const labelStyle = {
  width: '6in',
  height: '4in',
  boxSizing: 'border-box',
  padding: 0,
  margin: 0,
  background: '#fff',
  fontFamily: 'Arial, sans-serif',
  position: 'relative',
  overflow: 'hidden',
  border: '1px solid #333',
  display: 'grid',
  gridTemplateColumns: '1.2in 1.6in 1.6in 1.6in',
  gridTemplateRows: '0.6in 0.6in 0.35in 0.35in 0.35in 0.35in 0.35in 0.35in',
  gap: 0,
};

const cell = (children, style = {}) => (
  <div style={{ padding: '0.04in 0.06in', ...style }}>{children}</div>
);

const DamageReportLabel = ({
  logo = '/logo.jpg',
  id = '',
  date = '',
  serial = '',
  product = '',
  line = '',
  supervisor = '',
  operator = '',
  descriptionDr = '',
  explanation = '',
  sampleNet = '',
  supervisorExplanation = '',
}) => (
  <div style={labelStyle}>
    {/* Línea 1 */}
    {cell(<img src={logo} alt="Logo" style={{ height: '0.95in', width: '0.95in', objectFit: 'contain' }} />, { gridColumn: '1/2', gridRow: '1/3', borderRight: '1px solid #333', borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center' })}
    {cell(<span style={{ fontWeight: 'bold', fontSize: '0.32in', letterSpacing: '0.02in' }}>Damage Report</span>, { gridColumn: '2/4', gridRow: '1/3', borderRight: '1px solid #333', borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center' })}
    {cell(<span style={{ fontWeight: 'bold', fontSize: '0.18in' }}>IDDR</span>, { gridColumn: '4/5', gridRow: '1/2', borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center' })}
    {/* Línea 2, columna 4: ID del DR */}
    {cell(<span style={{ fontSize: '0.18in' }}>{id}</span>, { gridColumn: '4/5', gridRow: '2/3', borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center' })}
    {/* Línea 3: encabezados Serial, Product, Line, Date */}
    {cell(<span style={{ fontWeight: 'bold' }}>Serial#</span>, { gridColumn: '1/2', gridRow: '3/4', borderRight: '1px solid #333', borderBottom: '1px solid #333', textAlign: 'center' })}
    {cell(<span style={{ fontWeight: 'bold' }}>Product</span>, { gridColumn: '2/3', gridRow: '3/4', borderRight: '1px solid #333', borderBottom: '1px solid #333', textAlign: 'center' })}
    {cell(<span style={{ fontWeight: 'bold' }}>Line</span>, { gridColumn: '3/4', gridRow: '3/4', borderRight: '1px solid #333', borderBottom: '1px solid #333', textAlign: 'center' })}
    {cell(<span style={{ fontWeight: 'bold' }}>Date</span>, { gridColumn: '4/5', gridRow: '3/4', borderBottom: '1px solid #333', textAlign: 'center' })}
    {/* Línea 4: datos Serial, Product, Line, Date */}
    {cell(serial, { gridColumn: '1/2', gridRow: '4/5', borderRight: '1px solid #333', borderBottom: '1px solid #333', textAlign: 'center' })}
    {cell(product, { gridColumn: '2/3', gridRow: '4/5', borderRight: '1px solid #333', borderBottom: '1px solid #333', textAlign: 'center' })}
    {cell(line, { gridColumn: '3/4', gridRow: '4/5', borderRight: '1px solid #333', borderBottom: '1px solid #333', textAlign: 'center' })}
    {cell(date, { gridColumn: '4/5', gridRow: '4/5', borderBottom: '1px solid #333', textAlign: 'center' })}
    {/* Línea 5: encabezados Description, Supervisor, Operator, Sample */}
    {cell(<span style={{ fontWeight: 'bold' }}>Description</span>, { gridColumn: '1/2', gridRow: '5/6', borderRight: '1px solid #333', borderBottom: '1px solid #333', textAlign: 'center' })}
    {cell(<span style={{ fontWeight: 'bold' }}>Supervisor</span>, { gridColumn: '2/3', gridRow: '5/6', borderRight: '1px solid #333', borderBottom: '1px solid #333', textAlign: 'center' })}
    {cell(<span style={{ fontWeight: 'bold' }}>Operator</span>, { gridColumn: '3/4', gridRow: '5/6', borderRight: '1px solid #333', borderBottom: '1px solid #333', textAlign: 'center' })}
    {cell(<span style={{ fontWeight: 'bold' }}>Sample</span>, { gridColumn: '4/5', gridRow: '5/6', borderBottom: '1px solid #333', textAlign: 'center' })}
    {/* Línea 6: datos Description, Supervisor, Operator, Sample */}
    {cell(descriptionDr, { gridColumn: '1/2', gridRow: '6/7', borderRight: '1px solid #333', borderBottom: '1px solid #333', textAlign: 'center' })}
    {cell(supervisor, { gridColumn: '2/3', gridRow: '6/7', borderRight: '1px solid #333', borderBottom: '1px solid #333', textAlign: 'center' })}
    {cell(operator, { gridColumn: '3/4', gridRow: '6/7', borderRight: '1px solid #333', borderBottom: '1px solid #333', textAlign: 'center' })}
    {cell(sampleNet, { gridColumn: '4/5', gridRow: '6/7', borderBottom: '1px solid #333', textAlign: 'center' })}
    {/* Línea 7: encabezados Explanation, Note */}
    {cell(<span style={{ fontWeight: 'bold' }}>Explanation</span>, { gridColumn: '1/2', gridRow: '7/8', borderRight: '1px solid #333', borderBottom: '1px solid #333', textAlign: 'center' })}
    {cell(<span style={{ fontWeight: 'bold' }}>Note</span>, { gridColumn: '2/5', gridRow: '7/8', borderBottom: '1px solid #333', textAlign: 'left' })}
    {/* Línea 8: datos Explanation, Note */}
    {cell(explanation, { gridColumn: '1/2', gridRow: '8/9', borderRight: '1px solid #333', textAlign: 'center' })}
    {cell(supervisorExplanation, { gridColumn: '2/5', gridRow: '8/9', textAlign: 'left' })}
  </div>
);

export default DamageReportLabel;
