// Tooltip configurations for form fields
export const formTooltips = {
  portfolioName: "No special characters are allowed, except for underscores (_) and hyphens (-). Additionally, keywords like 'advice' and the name of the selected CSP, (e.g., aws, azure, gcp) are not accepted when entered in lowercase.",
  region: "Region associated with CSP",
  size: "Instance associated with Region",
  uuid: "Enter UUID/Instance Name, For Ex: VM for AI/ML server",
  quantity: "No. of similar sized instances",
  hours: "Total hours used for the month (quantity*730)",
};

// Tooltip configurations for buttons
export const buttonTooltips = {
  add: "Add the current instance configuration to your portfolio",
  findReplace: "Search and replace values across multiple instances",
  cloudUsage: "View detailed cloud usage reports and analytics",
  delete: "Remove the selected instance from your portfolio",
  help: "Data correction & adjustment guidlines"
};

// Tooltip configurations for table headers
export const tableTooltips = {
  uuid: "Unique identifier for each instance",
  region: "Deployment region of the instance",
  size: "Instance size and configuration",
  quantity: "Number of instances",
  hours: "Monthly runtime hours",
  pricingModel: "Selected pricing model",
  actions: "Available actions for this instance"
};

// Common tooltip styles
export const tooltipStyles = {
  tooltip: {
    backgroundColor: '#333',
    color: '#fff',
    fontSize: '12px',
    padding: '8px 12px',
    borderRadius: '4px',
    maxWidth: '300px'
  },
  arrow: {
    color: '#333'
  }
}; 