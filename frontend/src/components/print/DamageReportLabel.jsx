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
};

const headerStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: '0.5in',
  borderBottom: '1px solid #333',
  padding: '0 0.15in',
  boxSizing: 'border-box',
};

const logoStyle = {
  height: '0.4in',
  width: '0.4in',
  objectFit: 'contain',
  marginRight: '0.2in',
};

const titleStyle = {
  flex: 1,
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '0.28in',
  letterSpacing: '0.03in',
};

const idDateStyle = {
  minWidth: '1.2in',
  textAlign: 'right',
  fontSize: '0.15in',
  lineHeight: 1.1,
};


const bodyStyle = {
  display: 'grid',
  gridTemplateColumns: '1.5in 1.5in 1.5in 1.5in',
  gridTemplateRows: '0.6in 0.6in 0.6in 0.6in',
  gap: '0.08in',
  padding: '0.18in',
  fontSize: '0.17in',
  boxSizing: 'border-box',
  height: '3.5in',
};

const label = (label, value, span = 1) => (
  <div style={{ gridColumn: `span ${span}` }}>
    <div style={{ fontWeight: 'bold', marginBottom: '0.04in' }}>{label}</div>
    <div style={{ wordBreak: 'break-word' }}>{value}</div>
  </div>
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
    {/* Header */}
    <div style={headerStyle}>
      <img src={logo} alt="Logo" style={logoStyle} />
      <div style={titleStyle}>Damage Report</div>
      <div style={idDateStyle}>
        <div>ID: <b>{id}</b></div>
        <div>{date}</div>
      </div>
    </div>
    {/* Body */}
    <div style={bodyStyle}>
      {label('Serial #', serial)}
      {label('Line #', line)}
      {label('Product #', product)}
      {label('Supervisor', supervisor)}
      {label('Operator', operator)}
      {label('Description of Damage', descriptionDr, 2)}
      {label('Explanation', explanation, 2)}
      {label('Sample Net', sampleNet)}
      {label('Supervisor Explanation', supervisorExplanation, 4)}
    </div>
  </div>
);

export default DamageReportLabel;
