module.exports = {
  semi: true,
  // singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  
  importOrder: [
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",  
    "^@components/(.*)$", 
    "^@/(.*)$", 
    "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true
}
