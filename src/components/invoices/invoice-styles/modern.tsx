import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 12,
    marginBottom: 5,
  },
  table: {
    display: 'table',
    width: '100%',
    marginTop: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: 5,
  },
  tableHeader: {
    backgroundColor: '#f8f9fa',
    fontWeight: 'bold',
  },
  tableCell: {
    flex: 1,
    padding: 5,
  },
});

export function ModernInvoice({ data, businessType }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>INVOICE</Text>
          <Text style={styles.info}>Invoice #: {data.invoiceNumber}</Text>
          <Text style={styles.info}>Date: {data.date}</Text>
        </View>

        <View style={styles.info}>
          <Text>Bill To:</Text>
          <Text>{data.customerName}</Text>
          <Text>{data.email}</Text>
          <Text>{data.address}</Text>
        </View>

        <View style={styles.table}>
          {/* Table headers based on business type */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            {businessType === 'retail' && (
              <>
                <Text style={styles.tableCell}>Item</Text>
                <Text style={styles.tableCell}>Quantity</Text>
                <Text style={styles.tableCell}>Price</Text>
              </>
            )}
            {/* Add other business type headers */}
          </View>
          {/* Table content would go here */}
        </View>
      </Page>
    </Document>
  );
}