import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

const JsPDFHeader = () => {
  const [filters, setFilters] = useState({
    convenio: '',
    unidade: '',
    local: '',
    secao: '',
    destino: '',
  });

  const [dateRange, setDateRange] = useState({
    dtInicio: '',
    dtFim: '',
  });

  const createHeaderDefault = (doc) => {
    const cliente = {
      nome: 'EMPRESA EXEMPLteste de fidelidadeee',
      cnpj: '12.345.678/0001-90',
    };

    const defaultValue = 'TODOS';
    const page = 1;
    const nameReport = 'RELATÓRIO DE TESTE';

    let y = 0;
    let pgy = 0;
    
    doc.setFont('courier', 'bold');
    doc.setFontSize(14);
    doc.text(cliente.nome, 10, 10);
    doc.text('CNPJ:', 10, 15);
    doc.text(cliente.cnpj, 28, 15);
    doc.text(nameReport, 10, 20);
    
    //(filters.unidade && filters.local && filters.secao && filters.destino) ? pgy = 35 : pgy = 30;
    pgy = 30;

    if (filters.convenio) {
      doc.text(`Convênio:${filters.convenio || defaultValue}`, 10, 25);
      doc.text(`PG.${page}`, 190, pgy);
      y = 30;
    } else {
      doc.text(`PG.${page}`, 190, pgy);
      y = 25;
    }
    doc.text(`Período de ${dateRange.dtInicio} à ${dateRange.dtFim}`, 10, y); // y = 30
    
    let x = 0;
    if (filters.convenio >= 35) x = 120;
    
    filters.unidade ? (doc.text(`Unidade:${filters.unidade || defaultValue}`, 120, 10), y = 15) : y = 10; // eslint-disable-line no-unused-expressions
    filters.local ? (doc.text(`Local:${filters.local || defaultValue}`, 120, y), y += 5) : ''; // eslint-disable-line no-unused-expressions
    filters.secao ? (doc.text(`Seção:${filters.secao || defaultValue}`, 120, y), y += 5) : '' // eslint-disable-line no-unused-expressions
    filters.destino ? doc.text(`Destino:${filters.destino || defaultValue}`, 120, y) : ''; // eslint-disable-line no-unused-expressions

    // doc.text(`Unidade:${filters.unidade || defaultValue}`, 10, 30);
    // doc.text(`Local:${filters.local || defaultValue}`, 10, 35);
    // doc.text(`Seção:${filters.secao || defaultValue}`, 10, 40);
    // doc.text(`Destino:${filters.destino || defaultValue}`, 10, 45);
    // doc.text(`Período de ${dateRange.dtInicio} à ${dateRange.dtFim}`, 10, 50);
    // doc.text(`PG.${page}`, 190, 50);
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    createHeaderDefault(doc);
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Teste de Impressão com jsPDF</h1>
      <div>
        <h2>Filtros:</h2>
        <input
          type="text"
          name="convenio"
          value={filters.convenio}
          onChange={handleFilterChange}
          placeholder="Convênio"
        />
        <input
          type="text"
          name="unidade"
          value={filters.unidade}
          onChange={handleFilterChange}
          placeholder="Unidade"
        />
        <input
          type="text"
          name="local"
          value={filters.local}
          onChange={handleFilterChange}
          placeholder="Local"
        />
        <input
          type="text"
          name="secao"
          value={filters.secao}
          onChange={handleFilterChange}
          placeholder="Seção"
        />
        <input
          type="text"
          name="destino"
          value={filters.destino}
          onChange={handleFilterChange}
          placeholder="Destino"
        />
      </div>
      <div>
        <h2>Período:</h2>
        <input
          type="date"
          name="dtInicio"
          value={dateRange.dtInicio}
          onChange={handleDateChange}
        />
        <input
          type="date"
          name="dtFim"
          value={dateRange.dtFim}
          onChange={handleDateChange}
        />
      </div>
      <button onClick={handleGeneratePDF}>Gerar e Exibir PDF</button>
    </div>
  );
};

export default JsPDFHeader;