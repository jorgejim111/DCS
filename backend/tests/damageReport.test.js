import { describe, it, expect } from 'vitest';
import DamageReport from '../models/DamageReport';

describe('DamageReport Model', () => {
  it('should find all damage reports', async () => {
    const result = await DamageReport.findAll();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should create a new damage report', async () => {
    // Serial único
    const uniqueSerial = 'TEST-DR' + Date.now();
    const dieSerial = {
      serial_number: uniqueSerial,
      die_description_id: 1,
      status_id: 1,
      inner: 0,
      outer: 0,
      proudness: 0
    };
    const dieSerialId = await require('../models/DieSerial').create(dieSerial);

    // Usar IDs válidos de los catálogos (asumiendo que existen con id=1)
    const newReport = {
      die_serial_id: dieSerialId,
      line_id: 1,
      product_id: 1,
      operator_id: 1,
      supervisor_id: 1,
      description_dr_id: 1,
      explanation_id: 1,
      if_sample: false,
      note: '',
      status_id: 1,
      verdict: ''
    };
    const id = await DamageReport.create(newReport);
    expect(typeof id).toBe('number');
  });

  it('should update a damage report', async () => {
    // Serial único
    const uniqueSerial = 'UPDATE-DR' + Date.now();
    const dieSerial = {
      serial_number: uniqueSerial,
      die_description_id: 1,
      status_id: 1,
      inner: 0,
      outer: 0,
      proudness: 0
    };
    const dieSerialId = await require('../models/DieSerial').create(dieSerial);
    // Crea un DamageReport válido
    const newReport = {
      die_serial_id: dieSerialId,
      line_id: 1,
      product_id: 1,
      operator_id: 1,
      supervisor_id: 1,
      description_dr_id: 1,
      explanation_id: 1,
      if_sample: false,
      note: '',
      status_id: 1,
      verdict: ''
    };
    const reportId = await DamageReport.create(newReport);
    const updated = await DamageReport.update(reportId, { die_serial_id: dieSerialId, line_id: 1, product_id: 1, operator_id: 1, supervisor_id: 1, description_dr_id: 1, explanation_id: 1, if_sample: false, note: 'Updated', status_id: 1, verdict: 'OK' });
    expect(updated).toBe(true);
  });

  it('should find damage report by id', async () => {
    // Serial único
    const uniqueSerial = 'FIND-DR' + Date.now();
    const dieSerial = {
      serial_number: uniqueSerial,
      die_description_id: 1,
      status_id: 1,
      inner: 0,
      outer: 0,
      proudness: 0
    };
    const dieSerialId = await require('../models/DieSerial').create(dieSerial);
    // Crea un DamageReport válido
    const newReport = {
      die_serial_id: dieSerialId,
      line_id: 1,
      product_id: 1,
      operator_id: 1,
      supervisor_id: 1,
      description_dr_id: 1,
      explanation_id: 1,
      if_sample: false,
      note: '',
      status_id: 1,
      verdict: ''
    };
    const reportId = await DamageReport.create(newReport);
    const report = await DamageReport.findById(reportId);
    expect(report).toHaveProperty('id');
  });
});
