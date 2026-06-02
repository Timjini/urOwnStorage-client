export const formatAddress = (address: any) => {
  if (!address) return "";

  const street1 = address.address1?.trim() || "";
  const street2 = address.address2?.trim() || "";
  const street = [street1, street2].filter(Boolean).join(", ");

  const city = address.city?.trim() || "";
  const state = address.state?.trim() || "";
  const postalcode = address.postalcode?.trim() || "";
  const country = address.country?.trim() || "";

  const cityStateZip = [city, state].filter(Boolean).join(", ") + (postalcode ? ` ${postalcode}` : "");

  return [street, cityStateZip, country].filter(Boolean).join(" - ");
};