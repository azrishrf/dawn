class CustomCartDrawer extends HTMLElement {
  constructor() {
    super();

    this.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.close());
    this.querySelector('#CustomCartDrawer-Overlay').addEventListener('click', this.close.bind(this));
  }

  open(triggeredBy) {
    if (triggeredBy) this.setActiveElement(triggeredBy);
    
    // Add classes with slight delay for animation
    setTimeout(() => {
      this.classList.add('animate', 'active');
    }, 10);

    document.body.classList.add('overflow-hidden');
  }

  close() {
    this.classList.remove('active');
    document.body.classList.remove('overflow-hidden');
    
    // Remove animate class after transition
    setTimeout(() => {
      this.classList.remove('animate');
    }, 300);
  }

  renderContents(parsedState) {
    this.productId = parsedState.id;
    this.getSectionsToRender().forEach((section) => {
      const sectionElement = section.selector
        ? document.querySelector(section.selector)
        : document.getElementById(section.id);

      if (!sectionElement) return;
      sectionElement.innerHTML = this.getSectionInnerHTML(parsedState.sections[section.id], section.selector);
    });

    // Re-attach overlay click listener after content update
    setTimeout(() => {
      const overlay = this.querySelector('#CustomCartDrawer-Overlay');
      if (overlay) {
        overlay.addEventListener('click', this.close.bind(this));
      }
      this.open();
    });
  }

  getSectionInnerHTML(html, selector = '.shopify-section') {
    return new DOMParser().parseFromString(html, 'text/html').querySelector(selector).innerHTML;
  }

  getSectionsToRender() {
    return [
      {
        id: 'custom-cart-drawer',
        selector: '#CustomCartDrawer',
      },
      {
        id: 'cart-icon-bubble',
      },
    ];
  }

  getSectionDOM(html, selector = '.shopify-section') {
    return new DOMParser().parseFromString(html, 'text/html').querySelector(selector);
  }

  setActiveElement(element) {
    this.activeElement = element;
  }
}

customElements.define('custom-cart-drawer', CustomCartDrawer);
