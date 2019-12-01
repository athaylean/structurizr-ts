import { Workspace, WorkspaceType} from '../../dist'

export default (() => {
  const workspace = new Workspace({
    "type": WorkspaceType.systemLandscape,
    "scope": "Big Bank plc",
    "description": "The system landscape diagram for Big Bank plc.",
  });

  // Persons

  const bankStaff = workspace.addPerson('Bank Staff', {
    "description": "Staff within the bank."
  });

  const customer = workspace.addPerson('Customer', {
    "description": "A customer of the bank."
  });

// Software Systems

  const atm = workspace.addSoftwareSystem('ATM', {
    "description": "Allows customers to withdraw cash.",
    "tags": "Internal",
  });

  const internetBankingSystem = workspace.addSoftwareSystem('Internet Banking System', {
    "description": "Allows customers to view information about their bank accounts and make payments.",
    "tags": "Internal",
  });

  const mainframeBankingSystem = workspace.addSoftwareSystem('Mainframe Banking System', {
    "description": "Stores all of the core banking information about customers, accounts, transactions, etc.",
    "tags": "Internal",
  });

  // Relations

  workspace.addRelationship(atm, mainframeBankingSystem, {
    "description": "Uses",
    "technology": "",
  });

  workspace.addRelationship(bankStaff, mainframeBankingSystem, {
    "description": "Uses",
    "technology": "",
  });

  workspace.addRelationship(customer, internetBankingSystem, {
    "description": "Uses",
    "technology": "",
  });

  workspace.addRelationship(customer, atm, {
    "description": "Withdraws cash using",
    "technology": "",
  });

  workspace.addRelationship(internetBankingSystem, mainframeBankingSystem, {
    "description": "Uses",
    "technology": "",
  });

  return workspace.generate('system-landscape')
})()
