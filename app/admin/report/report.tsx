import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  PDFDownloadLink 
} from '@react-pdf/renderer';

// 1. Definisikan Style untuk Dokumen
const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, fontFamily: 'Helvetica' },
  header: { marginBottom: 20, borderBottom: 1, paddingBottom: 10 },
  title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  
  // Section Ringkasan
  summarySection: { marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between' },
  summaryBox: { padding: 10, backgroundColor: '#f8f9fa', width: '30%', borderRadius: 4 },
  label: { fontSize: 9, color: '#6c757d', marginBottom: 4 },
  value: { fontSize: 12, fontWeight: 'bold' },

  // Styling Tabel
  table: { display: 'table', width: 'auto', marginTop: 10 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#dee2e6', alignItems: 'center', minHeight: 30 },
  tableHeader: { backgroundColor: '#343a40', color: '#ffffff' },
  tableCol: { width: '25%', padding: 5 },
  tableColHeader: { fontWeight: 'bold', fontSize: 10 },
  
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, textAlign: 'center', color: '#bcbcbc', fontSize: 10 }
});

// 2. Komponen Dokumen PDF
const MyReportPDF = ({ reportData }) => {
  // Helper untuk format mata uang
  const formatIDR = (val) => `Rp ${val?.toLocaleString() || 0}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>LAPORAN OKUPANSI & PENDAPATAN</Text>
        </View>

        {/* Summary Boxes */}
        <View style={styles.summarySection}>
          <View style={styles.summaryBox}>
            <Text style={styles.label}>Total Pendapatan</Text>
            <Text style={styles.value}>{formatIDR(reportData.monthly_income)}</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.label}>Okupansi Bulanan</Text>
            <Text style={styles.value}>{reportData.monthly_occupancy}%</Text>
          </View>
          <View style={styles.summaryBox}>
            <Text style={styles.label}>Tamu Akan Datang</Text>
            <Text style={styles.value}>{reportData.upcoming_guests} Orang</Text>
          </View>
        </View>

        {/* Tabel Data Kamar */}
        <Text style={{ fontSize: 14, marginBottom: 10, fontWeight: 'bold' }}>Rincian Per Kamar</Text>
        <View style={styles.table}>
          {/* Header Tabel */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={[styles.tableCol, { width: '10%' }]}><Text style={styles.tableColHeader}>No</Text></View>
            <View style={[styles.tableCol, { width: '40%' }]}><Text style={styles.tableColHeader}>Nama Kamar</Text></View>
            <View style={[styles.tableCol, { width: '25%' }]}><Text style={styles.tableColHeader}>Tipe</Text></View>
            <View style={[styles.tableCol, { width: '25%' }]}><Text style={styles.tableColHeader}>Pendapatan</Text></View>
          </View>

          {/* Isi Tabel */}
          {reportData.rooms.map((room, index) => (
            <View style={styles.tableRow} key={room.id}>
              <View style={[styles.tableCol, { width: '10%' }]}><Text>{room.number}</Text></View>
              <View style={[styles.tableCol, { width: '40%' }]}><Text>{room.name}</Text></View>
              <View style={[styles.tableCol, { width: '25%' }]}><Text>{room.roomtype.name}</Text></View>
              <View style={[styles.tableCol, { width: '25%' }]}><Text>{formatIDR(room.current_month_income)}</Text></View>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>Dicetak pada: {new Date().toLocaleString('id-ID')}</Text>
      </Page>
    </Document>
  );
};

// 3. Komponen Utama untuk Tombol Download
const PrintModule = ({ data }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <PDFDownloadLink
        document={<MyReportPDF reportData={data} />}
        fileName={`Laporan_Bulanan_${new Date().getTime()}.pdf`}
        className='hover:bg-white/20 p-2 rounded-lg text-sm'
      >
        {({ loading }) => (loading ? 'Menyiapkan Dokumen...' : 'Print PDF')}
      </PDFDownloadLink>
    </div>
  );
};

export default PrintModule;
