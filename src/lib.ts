export enum WorkspaceType {
  systemLandscape = 'System Landscape',
  systemContext = 'System Context',
  container = 'Container',
  component = 'Component',
}

export enum ElementType {
  person = 'Person',
  softwareSystem = 'Software System',
  container = 'Container',
  component = 'Component',
}

interface IElement {
  type: ElementType,
  name: string,
  description: string,
  tags: string[],
  containers?: IElement[],
  components?: IElement[],
}

interface IRelationship {
  source: string,
  destination: string,
  description: string,
  technology: string,
  tags?: string[]
}

interface IRelationOptions {
  description: string,
  technology: string,
  tags?: string[]
}

interface IWorkspace {
  type: WorkspaceType,
  scope: string,
  description: string
}

export class Workspace {
  private readonly type: WorkspaceType;
  private readonly scope: string;
  private readonly description: string;
  private elements: IElement[] = [];
  private relationships: IRelationship[] = [];

  constructor(data: IWorkspace) {
    this.type = data.type;
    this.scope = data.scope;
    this.description = data.description;
  }

  public addPerson(name, options) {
    const person = {
      name,
      type: ElementType.person,
      ...options
    };

    this.elements.push(person);

    return person
  }

  public addSoftwareSystem(name, options) {
    const softwareSystem = {
      name,
      type: ElementType.softwareSystem,
      containers: [],
      ...options
    };

    softwareSystem.addContainer = (name, options) => {
      const container = {
        name,
        type: ElementType.container,
        components: [],
        ...options
      };

      container.addComponent = (name, options) => {
        const component = {
          name,
          type: ElementType.component,
          ...options
        };

        container.components.push(component);

        return component
      };

      softwareSystem.containers.push(container);

      return container
    };

    this.elements.push(softwareSystem);

    return softwareSystem
  }

  public addRelationship(source: IElement, destination: IElement, options: IRelationOptions ) {
    this.relationships.push({
      source: source.name,
      destination: destination.name,
      description: options.description,
      tags: options.tags,
      technology: options.technology,
    })
  }

  public generate(filename, options?) {
    return {
      filename,
      options: options || { separation: new Separation()},
      type: this.type,
      scope: this.scope,
      description: this.description,
      elements: this.elements,
      relationships: this.relationships,
      styles: styles,
    }
  }
}

export class Separation {
  public node = 100;
  public rank = 100;
  public edge = 100;

  constructor(data={}) {
    if (data['node'] !== undefined) {
      this.node = data['node']
    }

    if (data['rank'] !== undefined) {
      this.rank = data['rank']
    }

    if (data['edge'] !== undefined) {
      this.edge = data['edge']
    }
  }
}

const styles = [
  {
    "type": "element",
    "description": "",
    "tag": "Person",
    "width": "",
    "height": "",
    "background": "#08427b",
    "color": "#ffffff",
    "fontSize": "",
    "border": "",
    "opacity": "",
    "shape": "Person",
    "metadata": ""
  },
  {
    "type": "element",
    "description": "",
    "tag": "Software System",
    "width": "",
    "height": "",
    "background": "#1168bd",
    "color": "#ffffff",
    "fontSize": "",
    "border": "",
    "opacity": "",
    "shape": "",
    "metadata": ""
  },
  {
    "type": "element",
    "description": "",
    "tag": "Container",
    "width": "",
    "height": "",
    "background": "#438dd5",
    "color": "",
    "fontSize": "",
    "border": "",
    "opacity": "",
    "shape": "",
    "metadata": ""
  },
  {
    "type": "element",
    "description": "",
    "tag": "Database",
    "width": "",
    "height": "",
    "background": "",
    "color": "",
    "fontSize": "",
    "border": "",
    "opacity": "",
    "shape": "Cylinder",
    "metadata": ""
  },
  {
    "type": "element",
    "description": "",
    "tag": "Component",
    "width": "",
    "height": "",
    "background": "#85bbf0",
    "color": "#000000",
    "fontSize": "",
    "border": "",
    "opacity": "",
    "shape": "",
    "metadata": ""
  },
];
