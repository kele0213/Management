<template>
  <div class="zx-form">
    <div class="header">
      <slot name="header"> </slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item">
          <el-col v-bind="itemLayout" v-if="!item.isHidden">
            <!-- input和password -->
            <template v-if="item.type === 'input' || item.type === 'password'">
              <el-form-item
                :label="item.label"
                :rules="item.rules"
                :style="styleLayout"
              >
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.others"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="changeValue($event, item.field)"
                >
                </el-input>
              </el-form-item>
            </template>
            <!-- select -->
            <template v-if="item.type === 'select'">
              <el-form-item
                :label="item.label"
                :rules="item.rules"
                :style="styleLayout"
              >
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.others"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="changeValue($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :value="option.value"
                    :key="option.value"
                    :label="option.label"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
            <!-- datepicker -->
            <template v-if="item.type === 'dataPicker'">
              <el-form-item
                :label="item.label"
                :rules="item.rules"
                :style="styleLayout"
              >
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.others"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="changeValue($event, item.field)"
                ></el-date-picker>
              </el-form-item>
            </template>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"> </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, watch, ref } from 'vue'
import { IFormItem } from '../types'

export default defineComponent({
  props: {
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: () => '120px'
    },
    styleLayout: {
      type: Object,
      default: () => {
        return {
          padding: '10px 20px'
        }
      }
    },
    itemLayout: {
      type: Object,
      default: () => {
        return {
          xl: 6,
          lg: 8,
          md: 12,
          sm: 24,
          xs: 24
        }
      }
    },
    modelValue: {
      type: Object,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // const formValue = ref({ ...props.modelValue })
    // watch(
    //   formValue,
    //   (newValue) => {
    //     emit('update:modelValue', newValue)
    //   },
    //   {
    //     deep: true
    //   }
    // )
    const changeValue = (value: any, field: any) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }
    return { changeValue }
  }
})
</script>

<style scoped lang="less">
.el-form {
  padding-top: 5px;
}
</style>
