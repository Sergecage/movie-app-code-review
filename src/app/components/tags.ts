import { BaseComponent, type ElementFnProps } from '@components/base-component';

export const span = (props: ElementFnProps<HTMLElement>, ...children: BaseComponent[]) =>
  new BaseComponent({ ...props, tag: 'span' }, ...children); // missing <HTMLElement>,  new BaseComponent<HTMLElement>

export const main = (props: ElementFnProps, ...children: BaseComponent[]) => // missing <HTMLElement> in props props: ElementFnProps<HTMLElement>
  new BaseComponent({ ...props, tag: 'main' }, ...children); // missing <HTMLElement>,  new BaseComponent<HTMLElement> 

export const label = (props: ElementFnProps, ...children: BaseComponent[]) => // missing <HTMLElement> in props props: ElementFnProps<HTMLElement>
  new BaseComponent({ ...props, tag: 'label' }, ...children); // missing <HTMLElement>,  new BaseComponent<HTMLElement>

export const input = (props: ElementFnProps & Partial<HTMLInputElement>) =>
  new BaseComponent<HTMLInputElement>({ ...props, tag: 'input' });

export const iconFromCode = (props: ElementFnProps, code: string) => // missing <HTMLElement> in props props: ElementFnProps<HTMLElement>
  new BaseComponent({ ...props, tag: 'i', innerHTML: code }); // missing <HTMLElement>,  new BaseComponent<HTMLElement>

export const h2 = (className: string, txt: string): BaseComponent<HTMLElementTagNameMap['h2']> => // we should use props instead of className
  new BaseComponent({ tag: 'h2', className, txt });

export const h3 = (className: string, txt: string): BaseComponent<HTMLElementTagNameMap['h3']> => // we should use props instead of className
  new BaseComponent({ tag: 'h3', className, txt });

export const div = (props: ElementFnProps<HTMLDivElement>, ...children: (BaseComponent | HTMLElement | null)[]) =>
  new BaseComponent<HTMLDivElement>(props, ...children);

export const a = (props: ElementFnProps<HTMLLinkElement>, ...children: BaseComponent[]) =>
  new BaseComponent<HTMLLinkElement>({ ...props, tag: 'a' }, ...children);

export const img = ({ src = '', alt = '', className = '' }) =>
  new BaseComponent<HTMLElementTagNameMap['img']>({
    tag: 'img',
    className,
    src,
    alt,
  });
