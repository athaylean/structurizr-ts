import { Workspace, WorkspaceType, Separation } from '../../src'

export default (() => {
  const workspace = new Workspace({
    "type": WorkspaceType.container,
    "scope": "Internet Banking System",
    "description": "The container diagram for the Internet Banking System.",
  });

  // Persons

  const customer = workspace.addPerson('Customer', {
    "description": "A customer of the bank."
  });

  // Internet Banking System

  const internetBankingSystem = workspace.addSoftwareSystem('Internet Banking System', {
    "description": "Allows customers to view information about their bank accounts and make payments.",
    "tags": "Internal",
  });

  const database = internetBankingSystem.addContainer('Database', {
    "description": "Stores interesting data.",
    "technology": "Relational Database Schema",
    "tags": "Database",
  })

  const webApplication = internetBankingSystem.addContainer('Web Application', {
    "description": "Provides all of the Internet banking functionality to customers.",
    "technology": "Java and Spring MVC",
  })

  // Mainframe Banking System

  const mainframeBankingSystem = workspace.addSoftwareSystem('Mainframe Banking System', {
    "description": "Stores all of the core banking information about customers, accounts, transactions, etc.",
    "tags": "Internal",
  });

  // Relations

  workspace.addRelationship(customer, webApplication, {
    "description": "Uses",
    "technology": "HTTPS",
  });

  workspace.addRelationship(webApplication, mainframeBankingSystem, {
    "description": "Uses",
    "technology": "XML/HTTPS",
  });

  workspace.addRelationship(webApplication, database, {
    "description": "Reads from and writes to",
    "technology": "JDBC",
  });

  return workspace.generate('internet-banking-system.container', {
    generateKey: false,
    path: 'containers/internet-banking-system',
    separation: new Separation({ node: 300, edge: 300, rank: 300 }),
  })
})()
