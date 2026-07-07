<template>
  <ul class="nav-links">
    <!-- Single travelling indicator -->
    <div class="nav-indicator" ref="indicator">
      <div class="nav-indicator__circle"></div>
    </div>

    <li
      ref="link0"
      @mouseenter="increaseCursor"
      @mouseleave="decreaseCursor"
      :class="activeComponent === 'HeaderComponent' && '--active'"
      @click="changeDestinationComponent('HeaderComponent')"
    >
      Intro
    </li>
    <li
      ref="link1"
      @mouseenter="increaseCursor"
      @mouseleave="decreaseCursor"
      :class="activeComponent === 'AboutComponent' && '--active'"
      @click="changeDestinationComponent('AboutComponent')"
    >
      about
    </li>
    <li
      ref="link2"
      @mouseenter="increaseCursor"
      @mouseleave="decreaseCursor"
      :class="activeComponent === 'WorksComponent' && '--active'"
      @click="changeDestinationComponent('WorksComponent')"
    >
      Projects
    </li>
    <li
      ref="link3"
      @mouseenter="increaseCursor"
      @mouseleave="decreaseCursor"
      :class="activeComponent === 'WorksComponentExtra' && '--active'"
      @click="changeDestinationComponent('WorksComponentExtra')"
    >
      Playground
    </li>
    <li
      ref="link4"
      @mouseenter="increaseCursor"
      @mouseleave="decreaseCursor"
      :class="activeComponent === 'ContactComponent' && '--active'"
      @click="changeDestinationComponent('ContactComponent')"
    >
      Reach out
    </li>
  </ul>
</template>

<script setup>
const { $gsap } = useNuxtApp();
const { increaseCursor, decreaseCursor } = useMouseHover();

const COMPONENT_INDEX_MAP = {
  HeaderComponent: 0,
  AboutComponent: 1,
  WorksComponent: 2,
  WorksComponentExtra: 3,
  ContactComponent: 4
};

const props = defineProps({
  navVisibility: {
    type: Boolean,
    default: false
  },
  activeComponent: {
    type: String,
    default: "HeaderComponent"
  }
});

const emit = defineEmits(["updateDestinationComponent"]);

const indicator = ref(null);
const link0 = ref(null);
const link1 = ref(null);
const link2 = ref(null);
const link3 = ref(null);
const link4 = ref(null);
const linkEls = [link0, link1, link2, link3, link4];

const changeDestinationComponent = component => {
  if (component === props.activeComponent) return;
  emit("updateDestinationComponent", component);
};

const moveIndicator = (component, animate = true) => {
  const index = COMPONENT_INDEX_MAP[component];
  const targetLi = linkEls[index]?.value;
  const indicatorEl = indicator.value;

  if (!targetLi || !indicatorEl) return;

  // offsetTop gives position relative to the ul parent
  const targetTop = targetLi.offsetTop + targetLi.offsetHeight / 2;

  if (animate) {
    $gsap.to(indicatorEl, {
      top: targetTop,
      duration: 0.6,
      ease: "power3.inOut"
    });
  } else {
    $gsap.set(indicatorEl, { top: targetTop });
  }
};

const animateNavOut = () => {
  $gsap.to(".nav-links", {
    height: 0,
    opacity: 0,
    duration: 1,
    ease: "back"
  });
};

const animateNavIn = () => {
  $gsap.to(".nav-links", {
    height: "auto",
    opacity: 1,
    duration: 1,
    ease: "back"
  });
};

watch(
  () => props.navVisibility,
  newValue => {
    if (newValue) {
      animateNavIn();
    } else {
      animateNavOut();
    }
  }
);

watch(
  () => props.activeComponent,
  newComponent => {
    moveIndicator(newComponent, true);
  }
);

onMounted(() => {
  // Snap indicator to initial active item with no animation
  nextTick(() => {
    moveIndicator(props.activeComponent, false);
  });
});
</script>
