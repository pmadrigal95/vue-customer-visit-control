import xlsx from "json-as-xlsx";


const generateXlsx = ({fileName, data}) => {
      
      let settings = {
        fileName: fileName, // Name of the resulting spreadsheet
        extraLength: 3, // A bigger number means that columns will be wider
        writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
        writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
        RTL: false, // Display the columns from right-to-left (the default value is false)
      }
      
      xlsx(data, settings) // Will download the excel file
};

export const baseJsonToXlsxHelper = {

    $_generateXlsx({fileName, data}) {
        return generateXlsx({fileName, data});
    },
    
};