import moment from "moment";

/**
 * 表格显示内容格式化 非表格也可调用
 */
export default {
  install(Vue) {
    /**
     * 栗子-修改状态 1 修改成功 2 修改中 3修改失败
     */
    Vue.prototype.formatStatus = (row, column) => {
      let value = null;
      if (column.property) {
        value = row[column.property];
      } else {
        value = row[column];
      }
      switch (value) {
        case 1:
          return '<font class="c_green">修改成功</font>';
        case 2:
          return '<font class="c_blue">修改中</font>';
        case 3:
          return '<font class="c_red">修改失败</font>';
      }
      return value;
    };
    /**
     *  格式化时间
     * */
    Vue.prototype.formatTimes = (row, column) => {
      let Time = null;
      if (row[column]) {
        if (column.property) {
          Time = moment(row[column.property]).format('YYYY-MM-DD HH:mm:ss');
        } else {
          Time = moment(row[column]).format('YYYY-MM-DD HH:mm:ss');
        }
      }
      return Time;
    };
    /**
     *  格式化是否
     * */
    Vue.prototype.formatWhether = (row, column) => {
      let value = null;
      if (column.property) {
        value = row[column.property];
      } else {
        value = row[column];
      }
      switch (value) {
        case 0:
          return '否';
        case 1:
          return '是';
      }
      return value;
    };
    /**
    *  运输订单相关格式化
    * */
    // TMS订单状态
    Vue.prototype.orderStatusFmt = (row, column) => {
      let value = null;
      if (column.property) {
        value = row[column.property];
      } else {
        value = row[column];
      }
      switch (value) {
        case 0:
          return '未配载';
        case 1:
          return '部分配载';
        case 2:
          return '完全配载';
      }
      return value;
    };
    // 是否加急
    Vue.prototype.isUrgentFmt = (row, column) => {
      let value = null;
      if (column.property) {
        value = row[column.property];
      } else {
        value = row[column];
      }
      switch (value) {
        case 0:
          return '否';
        case 1:
          return '是';
      }
      return value;
    };
    /**
    * 预配载单相关格式化
    * */
    // 调度状态
    Vue.prototype.dispatchStatusFmt = (row, column) => {
      let value = null;
      if (column.property) {
        value = row[column.property];
      } else {
        value = row[column];
      }
      switch (value) {
        case 0:
          return '未调度';
        case 1:
          return '待起运';
        case 2:
          return '进行中';
        case 3:
          return '已取消';
        case 4:
          return '部分调度';
        case 5:
          return '已完成';
        case 6:
          return '已过期';
      }
      return value;
    };
    // 发布状态
    Vue.prototype.releaseStatusFmt = (row, column) => {
      let value = null;
      if (column.property) {
        value = row[column.property];
      } else {
        value = row[column];
      }
      switch (value) {
        case 0:
          return '未发布';
        case 1:
          return '已发布';
        case -1:
          return '下架';
      }
      return value;
    };
    // 成交状态
    Vue.prototype.dealStatusFmt = (row, column) => {
      let value = null;
      if (column.property) {
        value = row[column.property];
      } else {
        value = row[column];
      }
      switch (value) {
        case 0:
          return '未成交';
        case 1:
          return '部分成交';
        case 2:
          return '已成交';
      }
      return value;
    };

    /**
    * 运单相关格式化
    * */
    // 运单状态
    Vue.prototype.waybillStatusFmt = (row, column) => {
      let value = null;
      if (column.property) {
        value = row[column.property];
      } else {
        value = row[column];
      }
      switch (value) {
        case 0:
          return '待起运';
        case 1:
          return '运输中';
        case 2:
          return '已完成';
      }
      return value;
    };
    // 回单状态
    Vue.prototype.receiptStatusFmt = (row, column) => {
      let value = null;
      if (column.property) {
        value = row[column.property];
      } else {
        value = row[column];
      }
      switch (value) {
        case 0:
          return '未回单';
        case 1:
          return '已回单';
        case 2:
          return '已回单';
      }
      return value;
    };
    // 始发地
    Vue.prototype.formatFromAddrFmt = (row, column) => {
      return row.fromAddressProvinceName + "-" + row.fromAddressCityName + "-" + row.fromAddressCountyName;
    };
    // 目的地
    Vue.prototype.formatToAddrFmt = (row, column) => {
      return row.toAddressProvinceName + "-" + row.toAddressCityName + "-" + row.toAddressCountyName;
    };
    // 签收状态
    Vue.prototype.signatureStatusFmt = (row, column) => {
      let value = null;
      if (column.property) {
        value = row[column.property];
      } else {
        value = row[column];
      }
      switch (value) {
        case 0:
          return '未签收';
        case 1:
          return '部分签收';
        case 2:
          return '异常签收';
        case 3:
          return '已签收';
      }
      return value;
    };
    // 支付状态
    Vue.prototype.paymentStatusFmt = (row, column) => {
      let value = null;
      if (column.property) {
        value = row[column.property];
      } else {
        value = row[column];
      }
      switch (value) {
        case 0:
          return '未支付';
        case 1:
          return '已支付';
      }
      return value;
    };
    /**
    * 回单管理相关
    * */
    Vue.prototype.receiptFmt = (row, column) => {
      if (row[column] === "0") {
        return '未回单';
      } else if (row[column] === "1") {
        return '已电子回单';
      } else if (row[column] === "2") {
        return '已纸质回单';
      }
    }
    /**
     * 运输异常管理相关
     * */
    Vue.prototype.abnormalStatusFmt = (row, column) => {
      if (row[column] === 0) {
        return '待处理';
      } else if (row[column] === 1) {
        return '处理中';
      } else if (row[column] === 2) {
        return '已处理';
      }
    }
  }
}
