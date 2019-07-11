<template>
  <div class="infinite-events">
    <header class="infinite-events__header" :class="{ 'input-active': inputActive }">
      <h3>Event schedule</h3>
      <button class="material-icons search-button" @click="inputActive = true">search</button>
      <input class="search-input" @input="handleSearchInput" placeholder="Filter events..." />
    </header>
    <section class="infinite-events__body">
      <infinite-scroll :loadmore.prop="loadmore" :hasmore.prop="hasmore" :usewindow.prop="useWindow">
        <template v-for="eventGroup in groupedevents">
          <h5 class="event-group-header" :key="eventGroup.date + '-header'">{{ eventGroup.date }}</h5>
          <hr :key="eventGroup.date + '-hr'" />
          <template v-for="(event, index) in eventGroup.events">
            <hr :key="event.id + '-hr'" v-if="index !== 0" />
            <div class="event-row" :key="event.id + '-row'">
              <div class="event-dot">
                <span :style="{ backgroundColor: event.calendar.color }"></span>
              </div>
              <div class="event-time">
                <span>{{ formatdate(event.start) }} - {{ formatdate(event.end) }}</span>
              </div>
              <div class="event-text">
                <span>{{ event.title }}</span>
              </div>
            </div>
          </template>
        </template>
      </infinite-scroll>
      <slot name="loading" v-if="isloading"></slot>
      <slot name="error" v-if="error"></slot>
    </section>
  </div>
</template>

<script>
  export default {
    props: {
      loadmore: {
        type: Function,
        default: null
      },
      formatdate: {
        type: Function,
        default: value => value
      },
      isloading: {
        type: Boolean,
        default: false
      },
      error: {
        type: String,
        default: ''
      },
      hasmore: {
        type: Boolean,
        default: true
      },
      groupedevents: {
        type: Array,
        default: () => []
      }
    },
    data: function() {
      return {
        inputActive: false,
        useWindow: false,
        searchInputTimeout: null
      }
    },
    methods: {
      handleSearchInput: function({ target }) {
        const hostElement = this.$el.parentNode.host;
        const value = target.value;

        if (this.searchInputTimeout) clearTimeout(this.searchInputTimeout);

        this.searchInputTimeout = setTimeout(function() {
          hostElement.dispatchEvent(new CustomEvent('filter', { detail: { value } }));
        }, 300);
      }
    }
  };
</script>

<style lang="scss">
  @import '../../styles/wc-common';
  @import './InfiniteEvents';
</style>
