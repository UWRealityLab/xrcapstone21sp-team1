/* global NAF
 * Define custom schema for syncing avatar color, position, rotation, and nametag */
NAF.schemas.add({
  template: '#avatar-template',
  components: [
    'position',
    'rotation',
    {
      selector: '.head-mesh',
      component: 'gltf-model'
    },
    {
      selector: '.nametag',
      component: 'text',
      property: 'value'
    },
    {
      selector: '.nametag',
      component: 'text',
      property: 'color'
    }
  ]
});

/* Define custom schema for syncing body position and rotation */
NAF.schemas.add({
  template: '#body-template',
  components: [
    'position',
    'rotation',
    {
      selector: '.body-mesh',
      component: 'gltf-model'
    }
  ],
});

/* Define custom schema for syncing if menu item is selected */ 
NAF.schemas.add({
  template: '#menu-template',
  components: [
    {
      selector: '.menu',
      component: 'intersect-color-change',
      property: 'isSelected'
    }
  ]
});

/* Define custom schema for syncing hand position and rotation */
NAF.schemas.add({
  template: '#hand-template',
  components: [
    'position',
    'rotation',
    {
      selector: '.fingers',
      component: 'gltf-model'
    }
  ],
});

/* Define custom schema for syncing ball color, position, and rotation */
NAF.schemas.add({
  template: '#ball-template',
  components: [
    'position',
    'rotation',
    {
      component: 'material',
      property: 'color'
    }
  ],
});

/* Define custom schema for syncing ball color, position, and rotation */
NAF.schemas.add({
  template: '#flag-template',
  components: [
    'position',
    'rotation',
    'gltf-model',
    'flagColor'
  ],
});