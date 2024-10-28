import React, { useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";

const getStyleConfig = (style = "modern") => {
  const styles = {
    modern: {
      primary: "#0f172a",
      secondary: "#e2e8f0",
      accent: "#0ea5e9",
      background: "#ffffff",
    },
    professional: {
      primary: "#2563eb",
      secondary: "#e5e7eb",
      accent: "#1d4ed8",
      background: "#f8fafc",
    },
    classic: {
      primary: "#334155",
      secondary: "#e2e8f0",
      accent: "#475569",
      background: "#f8fafc",
    },
    creative: {
      primary: "#ec4899",
      secondary: "#fce7f3",
      accent: "#db2777",
      background: "#ffffff",
    },
    bold: {
      primary: "#7c3aed",
      secondary: "#ede9fe",
      accent: "#6d28d9",
      background: "#ffffff",
    },
  };
  return styles[style] || styles.modern;
};

const createStyles = (theme) =>
  StyleSheet.create({
    page: {
      padding: 40,
      backgroundColor: theme.background,
      fontFamily: "Helvetica",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 40,
      borderBottomWidth: 2,
      borderBottomColor: theme.accent,
      paddingBottom: 20,
    },
    logoContainer: {
      width: 120,
      height: 60,
      borderRadius: 4,
      backgroundColor: "#f8fafc",
      justifyContent: "center",
      alignItems: "center",
    },
    logo: {
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "contain",
    },
    companyInfo: {
      alignItems: "flex-end",
    },
    companyName: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.primary,
      marginBottom: 4,
    },
    companyDetail: {
      fontSize: 10,
      color: "#64748b",
      marginBottom: 2,
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      color: theme.accent,
      marginBottom: 20,
    },
    infoSection: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 40,
    },
    infoBlock: {
      width: "45%",
    },
    infoLabel: {
      fontSize: 10,
      color: "#64748b",
      marginBottom: 8,
      fontWeight: "medium",
    },
    infoValue: {
      fontSize: 11,
      color: theme.primary,
      marginBottom: 4,
    },
    table: {
      marginTop: 20,
    },
    tableHeader: {
      flexDirection: "row",
      backgroundColor: theme.accent,
      padding: 12,
      borderRadius: 4,
      marginBottom: 8,
    },
    tableHeaderCell: {
      color: "white",
      fontSize: 11,
      fontWeight: "medium",
      flex: 1,
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#e2e8f0",
      padding: 12,
    },
    tableCell: {
      fontSize: 10,
      color: "#475569",
      flex: 1,
    },
    tableCellRight: {
      fontSize: 10,
      color: "#475569",
      flex: 1,
      textAlign: "right",
    },
    totalsSection: {
      marginTop: 30,
      alignItems: "flex-end",
    },
    totalRow: {
      flexDirection: "row",
      marginBottom: 8,
    },
    totalLabel: {
      fontSize: 11,
      color: "#64748b",
      marginRight: 40,
    },
    totalValue: {
      fontSize: 11,
      color: theme.primary,
      width: 80,
      textAlign: "right",
    },
    grandTotal: {
      marginTop: 8,
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: "#e2e8f0",
      flexDirection: "row",
    },
    grandTotalLabel: {
      fontSize: 12,
      fontWeight: "bold",
      color: theme.primary,
      marginRight: 40,
    },
    grandTotalValue: {
      fontSize: 12,
      fontWeight: "bold",
      color: theme.primary,
      width: 80,
      textAlign: "right",
    },
    footer: {
      position: "absolute",
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "#94a3b8",
      fontSize: 10,
      paddingHorizontal: 40,
    },
  });

export const ModernInvoice = ({
  data,
  businessType = "retail",
  style = "modern",
}) => {
  const theme = getStyleConfig(style);
  const styles = createStyles(theme);
  const [logoBlobUrl, setLogoBlobUrl] = useState(null);

  useEffect(() => {
    if (data.logo && data.logo.startsWith("data:image")) {
      const blob = base64ToBlob(data.logo, "image/png"); // Adjust MIME type as necessary
      setLogoBlobUrl(URL.createObjectURL(blob));
    } else if (data.logo) {
      setLogoBlobUrl(data.logo); // Use as-is if it's already a URL or Blob
    }
  }, [data.logo]);

  const calculateItemTotal = (item) => {
    if (businessType === "retail") {
      return (
        parseFloat(item.unitPrice || 0) * parseFloat(item.quantity || 0)
      ).toFixed(2);
    } else {
      return (
        parseFloat(item.ratePerHour || 0) * parseFloat(item.hours || 0)
      ).toFixed(2);
    }
  };

  const calculateSubtotal = () => {
    return (data.items || [])
      .reduce((sum, item) => sum + parseFloat(calculateItemTotal(item) || 0), 0)
      .toFixed(2);
  };

  const calculateTax = () => {
    return (parseFloat(calculateSubtotal()) * 0.1).toFixed(2);
  };

  const calculateTotal = () => {
    return (
      parseFloat(calculateSubtotal()) + parseFloat(calculateTax())
    ).toFixed(2);
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {data.logo ? (
            <View style={styles.logoContainer}>
              <img src={data.logo} style={styles.logo} />
            </View>
          ) : (
            <View style={styles.logoContainer}>
              <Text style={{ color: "#94a3b8" }}>No Logo</Text>
            </View>
          )}
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>
              {data.companyInfo?.name || "Company Name"}
            </Text>
            <Text style={styles.companyDetail}>
              {data.companyInfo?.website}
            </Text>
            <Text style={styles.companyDetail}>{data.companyInfo?.phone}</Text>
            <Text style={styles.companyDetail}>{data.companyInfo?.taxId}</Text>
          </View>
        </View>

        <Text style={styles.title}>INVOICE</Text>

        <View style={styles.infoSection}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>BILL TO</Text>
            <Text style={styles.infoValue}>
              {data.customerName || "Customer Name"}
            </Text>
            <Text style={styles.infoValue}>{data.email}</Text>
            <Text style={styles.infoValue}>{data.address}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>INVOICE DETAILS</Text>
            <Text style={styles.infoValue}>
              Invoice #: {data.invoiceNumber}
            </Text>
            <Text style={styles.infoValue}>Date: {data.date}</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            {businessType === "retail" ? (
              <>
                <Text style={styles.tableHeaderCell}>Item</Text>
                <Text style={styles.tableHeaderCell}>Quantity</Text>
                <Text style={styles.tableHeaderCell}>Unit Price</Text>
                <Text style={styles.tableHeaderCell}>Total</Text>
              </>
            ) : (
              <>
                <Text style={styles.tableHeaderCell}>Service</Text>
                <Text style={styles.tableHeaderCell}>Hours</Text>
                <Text style={styles.tableHeaderCell}>Rate</Text>
                <Text style={styles.tableHeaderCell}>Total</Text>
              </>
            )}
          </View>

          {(data.items || []).map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>
                {businessType === "retail" ? item.itemName : item.serviceName}
              </Text>
              <Text style={styles.tableCell}>
                {businessType === "retail" ? item.quantity : item.hours}
              </Text>
              <Text style={styles.tableCell}>
                ${businessType === "retail" ? item.unitPrice : item.ratePerHour}
              </Text>
              <Text style={styles.tableCellRight}>
                ${calculateItemTotal(item)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>${calculateSubtotal()}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax (10%)</Text>
            <Text style={styles.totalValue}>${calculateTax()}</Text>
          </View>
          <View style={styles.grandTotal}>
            <Text style={styles.grandTotalLabel}>Total</Text>
            <Text style={styles.grandTotalValue}>${calculateTotal()}</Text>
          </View>
        </View>

        <Text style={styles.footer}>Thank you for your business!</Text>
      </Page>
    </Document>
  );
};
