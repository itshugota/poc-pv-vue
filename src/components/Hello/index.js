import '../../helpers/normalize';
import Vue from 'vue';
import wrap from '@vue/web-component-wrapper';
import 'infinite-scroll-wc';

import HelloComponent from './Hello.vue';

customElements.define('s-infinite-events', wrap(Vue, HelloComponent));
