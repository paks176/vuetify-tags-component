<template>
<div>
  <v-list lines="one" class="d-flex" :class="this.contentAlign || 'justify-start'">
    <v-list-item
        v-for="tag in preparedTags"
        :key="tag.text"
        :title="tag.text"
    >
      
      <div v-if="tag.icon" class="mr-1">
        <v-icon>{{tag.icon}}</v-icon>
      </div>

      <div v-if="tag.text" class="tag__text">
        {{tag.text}}
      </div>
      
    </v-list-item>
    
  </v-list>

</div>
  
</template>

<script>
export default {
  name: "TagsList",
  props: {
    incomeTagsData: {
      type: Object,
    },
    contentAlign: {
      type: String,
    }
  },
  data() {
    return {
      preparedTags: null,
    }
  },
  
  mounted() {
    if (this.incomeTagsData.tags.length) {
      // dividers
      const divider = {icon: 'mdi-circle-small'}
      const processedArray = [];
      for (let i = 0; i < this.incomeTagsData.tags.length; i++) {
        if (i !== this.incomeTagsData.tags.length - 1) {
            processedArray.push(this.incomeTagsData.tags[i]);
            processedArray.push(divider);
        } else {
          processedArray.push(this.incomeTagsData.tags[i]);
        }
      }
      this.preparedTags = processedArray;
    }
    
    this.$nextTick(function() {
      this.checkSpace()
    });
    
    window.addEventListener('resize', this.checkSpace);
  },

  methods: {
    checkSpace() {
    
        const parentWidth = this.$el.parentNode.offsetWidth;
        const tags = this.$el.querySelectorAll('.v-list-item');
        let sumTagsWidth = 0;

        tags.forEach(tag => {
          sumTagsWidth += tag.getBoundingClientRect().width;
        });
        
        let counter = 1;

        if (parentWidth < sumTagsWidth) {
            while (parentWidth < sumTagsWidth) {
              let lastIndex = tags.length - counter;
              if (tags[lastIndex] && !(tags[lastIndex].classList.contains('d-none'))) {
                tags[lastIndex].classList.add('d-none');
              }
              
              // dot divider check
              if (tags[lastIndex - 1]) {
                const dot = tags[lastIndex - 1].querySelector('.mdi-circle-small')
                if (dot && !dot.classList.contains('d-none')) {
                  tags[lastIndex - 1].classList.add('d-none');
                }
              }
              sumTagsWidth = 0;
              tags.forEach(tag => {
                sumTagsWidth += tag.getBoundingClientRect().width;
              });
              counter += 1;
            }
        } else {
            let firstHiddenTag;
            tags.forEach(tag => {
              if (tag.classList.contains('d-none')) {
                firstHiddenTag = tag;
              }
            })
          
            if (firstHiddenTag) {
              const thisIndex = Array.from(tags).findIndex(tag => tag === firstHiddenTag);
              if (thisIndex) {
                const dot = tags[thisIndex - 1].querySelector('.mdi-circle-small')
                if (dot && !dot.classList.contains('d-none')) {
                  tags[thisIndex - 1].classList.remove('d-none');
                }
              }
              firstHiddenTag.classList.remove('d-none');
              this.checkSpace()
            }
        }
      
      
      // const parentWidth = this.$el.parentNode.offsetWidth;
      // if (this.incomeTagsData.tags.length) {
      //   const tags = this.$el.querySelectorAll('.v-list-item');
      //   let sumTagsWidth = 0;
      //
      //   tags.forEach(tag => {
      //     sumTagsWidth += tag.getBoundingClientRect().width;
      //   });
      //
      //   if (parentWidth < sumTagsWidth) {
      //     const prevTag = this.preparedTags[this.preparedTags.length - 2];
      //     const currentTag = this.preparedTags[this.preparedTags.length - 1];
      //     if (prevTag) {
      //       if (prevTag.icon && prevTag.icon === 'mdi-circle-small') {
      //           this.hiddenTags.push(prevTag);
      //           this.preparedTags.pop();
      //       }
      //     } else {
      //       this.hiddenTags.push(currentTag);
      //       this.preparedTags.pop();
      //     }
      //     this.$forceUpdate();
      //   } else if (this.hiddenTags.length > 0) {
      //     const putElement = this.hiddenTags[this.hiddenTags.length - 1];
      //     if (putElement.icon && putElement.icon === 'mdi-circle-small') {
      //         this.preparedTags.push(putElement);
      //         this.hiddenTags.pop();
      //         const nextTag = this.hiddenTags[this.hiddenTags.length - 1];
      //         this.preparedTags.push(nextTag);
      //         this.hiddenTags.pop();
      //     } else {
      //       this.preparedTags.push(putElement);
      //       this.hiddenTags.pop();
      //     }
      //     this.$forceUpdate();
      //   }
      // }
    }
  }
}
</script>

<style scoped>
  .v-list-item {
    flex: unset;
  }
  .tag__text {
    white-space: nowrap;
  }
</style>