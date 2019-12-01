import { Workspace, WorkspaceType} from '../../src'

export default (() => {
  const workspace = new Workspace({
    "type": WorkspaceType.component,
    "scope": "Web Application",
    "description": "The component diagram for the Web Application.",
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
  });

  const webApplication = internetBankingSystem.addContainer('Web Application', {
    "description": "Provides all of the Internet banking functionality to customers.",
    "technology": "Java and Spring MVC",
  });

  // Web Application Components
  const accountsSummaryController = webApplication.addComponent('Accounts Summary Controller', {
    "description": "Provides customers with an summary of their bank accounts.",
    "technology": "Spring MVC Controller",
  });

  const homePageController =  webApplication.addComponent('Home Page Controller', {
    "description": "Serves up the home page.",
    "technology": "Spring MVC Controller",
  });

  const mainframeBankingSystemFacade = webApplication.addComponent('Mainframe Banking System Facade', {
    "description": "A facade onto the mainframe banking system.",
    "technology": "Spring Bean",
  });

  const securityComponent = webApplication.addComponent('Security Component', {
    "description": "Provides functionality related to signing in, changing passwords, etc.",
    "technology": "Spring Bean",
  });

  const signInController =  webApplication.addComponent('Sign In Controller', {
    "description": "Allows users to sign in to the Internet Banking System.",
    "technology": "Spring MVC Controller",
  });


  // Mainframe Banking System

  const mainframeBankingSystem = workspace.addSoftwareSystem('Mainframe Banking System', {
    "description": "Stores all of the core banking information about customers, accounts, transactions, etc.",
    "tags": "Internal",
  });

  // Relations

  workspace.addRelationship(accountsSummaryController, mainframeBankingSystemFacade, {
    "description": "Uses",
    "technology": "",
  });

  workspace.addRelationship(customer, homePageController, {
    "description": "Uses",
    "technology": "HTTPS",
  });

  workspace.addRelationship(customer, accountsSummaryController, {
    "description": "Uses",
    "technology": "HTTPS",
  });

  workspace.addRelationship(customer, signInController, {
    "description": "Uses",
    "technology": "HTTPS",
  });

  workspace.addRelationship(mainframeBankingSystemFacade, mainframeBankingSystem, {
    "description": "Uses",
    "technology": "XML/HTTPS",
  });

  workspace.addRelationship(securityComponent, database, {
    "description": "Reads from and writes to",
    "technology": "JDBC",
  });

  workspace.addRelationship(signInController, securityComponent, {
    "description": "Uses",
    "technology": "",
  });

  return workspace.generate('web-application.component')
})()
