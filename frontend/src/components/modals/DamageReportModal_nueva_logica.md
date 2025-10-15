# Lógica nueva del modal DamageReportModal.jsx (impresión automática y flujo de guardado)

```jsx
// ... Código relevante del handleSubmit y modal de impresión ...
// 1. Crear Damage Report
const drResult = await createDamageReport(data);
// 2. Actualizar status del serial (enviando todos los campos requeridos)
if (serialInput) {
  const serialObj = await getDieSerialBySerialNumber(serialInput);
  if (serialObj) {
    await updateDieSerial(serialObj.id, {
      ...serialObj,
      status_id: 4 // Open DR
    });
  }
}
// 3. Crear registro en die history
if (serialId && supervisorId) {
  await createDieSerialHistory({
    die_serial_id: serialId,
    status_id: 4, // Open DR
    worker_id: supervisorId,
    note: supervisorExplanation || '',
  });
}
setSaveStatus('Damage Report saved successfully!');
// 4. Mostrar modal del label y esperar impresión antes de cerrar DR
setShowLabelModal(true);
setPendingClose(true); // Marcar que debe cerrarse después de imprimir

// ... Modal de impresión rotado y botones fuera del área rotada ...
```

> Esta lógica incluye: impresión automática tras guardar, actualización de status, creación de history y modal de label rotado.

---

Puedes reintroducir esta lógica después de restaurar la versión estable.
