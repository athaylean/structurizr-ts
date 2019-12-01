import { Workspace, WorkspaceType} from '../../src'

export default (() => {
  const workspace = new Workspace({
    "type": WorkspaceType.systemContext,
    "scope": "Internet Banking System",
    "description": "The system context diagram for the Internet Banking System.",
  });

  // Persons

  const customer = workspace.addPerson('Customer', {
    "description": "A customer of the bank."
  });

  // Software Systems

  const internetBankingSystem = workspace.addSoftwareSystem('Internet Banking System', {
    "description": "Allows customers to view information about their bank accounts and make payments.",
    "tags": "Internal",
  });

  const mainframeBankingSystem = workspace.addSoftwareSystem('Mainframe Banking System', {
    "description": "Stores all of the core banking information about customers, accounts, transactions, etc.",
    "tags": "Internal",
  });

  // Relations

  workspace.addRelationship(customer, internetBankingSystem, {
    "description": "Uses",
    "technology": "",
  });

  workspace.addRelationship(internetBankingSystem, mainframeBankingSystem, {
    "description": "Uses",
    "technology": "",
  });

  return workspace.generate('system-context')
})()
