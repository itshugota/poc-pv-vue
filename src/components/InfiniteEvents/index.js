import '../../helpers/normalize';
import Vue from 'vue';
import wrap from '@vue/web-component-wrapper';
import 'infinite-scroll-wc';

import InfiniteEventsComponent from './InfiniteEvents.vue';

customElements.define('s-infinite-events', wrap(Vue, InfiniteEventsComponent));
