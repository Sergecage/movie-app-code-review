import { isNotNullable } from '@utils/is-nullable';

export type Props<T extends HTMLElement = HTMLElement> = Partial<
  Omit<T, 'style' | 'dataset' | 'classList' | 'children' | 'tagName'> //I would add 'innerHTML' to this list as well to avoid unexpected behavior
> & {
  txt?: string;
  tag?: keyof HTMLElementTagNameMap;
};

export type ElementFnProps<T extends HTMLElement = HTMLElement> = Omit<Props<T>, 'tag'>;

export class BaseComponent<T extends HTMLElement = HTMLElement> {
  protected node: T;

  protected children: BaseComponent[] = [];

  constructor(p: Props<T>, ...children: (BaseComponent | HTMLElement | null)[]) {
    p.txt && (p.textContent = p.txt); // this is odd it could ovewrite the properties from Object.assign
    const node = document.createElement(p.tag ?? 'div') as T;
    Object.assign(node, p);
    // if ( p.txt) not if (children) 
    this.node = node;
    if (children) {
      this.appendChildren(children.filter(isNotNullable));
    }
  }

  public append(child: BaseComponent | HTMLElement): void {
    if (child instanceof BaseComponent) {
      this.children.push(child);
      this.node.append(child.getNode());
    } else {
      this.node.append(child);
    }
  }

  public appendChildren(children: (BaseComponent | HTMLElement | null)[]): void {
    children.filter(isNotNullable).forEach((el) => {
      this.append(el);
    });
  }

  public stc(text: string): void {
    this.node.textContent = text;
  }

  public getNode() {
    return this.node;
  }

  public addClass(classNameClassName: string): void { // I think className is enough
    this.node.classList.add(classNameClassName); // I think className is enough
  }

  public toggleClass(classSurname: string): void { // className is more simple and understandable than slassSurname
    this.node.classList.toggle(classSurname); // className is more simple and understandable than slassSurname
  }

  public removeClass(className: string): void {
    this.node.classList.remove(className);
  }

  public destroyAllHumans(): void {
    this.children.reduce((_, child) => { // I think we can use more simple method instead of reduce 
      child.destroy();
      return null;
    }, null);
    this.children.length = 0;

    //this.children.forEach((child) => child.destroy());
    //this.children.length = 0;
    //instead of reduce
  }

  public destroy(): void {
    this.destroyAllHumans();
    this.node.remove(); // I think it's better to remove it if we have parent node element parentNode?.remove()
  }
}
