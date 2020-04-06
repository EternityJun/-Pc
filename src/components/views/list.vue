 nbb<template>
  <div>
    <!--搜索栏 简版  输入框最多5个，个数根据输入框宽度和文字长度做相应调整·需适应1366屏幕 -->
    <div class="query_box">
      <el-form :inline="true">
        <el-form-item label="运单号">
          <el-input v-model="queryForm.waybillNo" placeholder="运单号" class="width140" clearable></el-input>
        </el-form-item>
        <el-form-item label="运单状态">
          <el-select v-model="queryForm.waybillStatus" class="width140" clearable>
            <el-option label="待起运" value="0"></el-option>
            <el-option label="运输中" value="1"></el-option>
            <el-option label="已完成" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车牌号">
          <el-input v-model="queryForm.vehicleNo" placeholder="车牌号" class="width140" clearable></el-input>
        </el-form-item>
        <el-form-item class="query_btns fr">
          <span class="more_btn themeColor" @click="showMore = true">更多选项 <i class="el-icon-arrow-down"></i></span>
          <el-button type="success" @click="queryList">查 询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--搜索栏 全部 如有时间这类比较宽的输入框则放到最后避免排版凌乱-->
    <div class="query_box query_more" v-if="showMore">
      <el-form :inline="true" label-width="90px">
        <el-form-item label="运单号">
          <el-input v-model="queryForm.waybillNo" placeholder="运单号" class="width140" clearable></el-input>
        </el-form-item>
        <el-form-item label="运单状态">
          <el-select v-model="queryForm.waybillStatus" class="width140" clearable>
            <el-option label="待起运" value="0"></el-option>
            <el-option label="运输中" value="1"></el-option>
            <el-option label="已完成" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车牌号">
          <el-input v-model="queryForm.vehicleNo" placeholder="车牌号" class="width140" clearable></el-input>
        </el-form-item>
        <el-form-item label="TMS订单号">
          <el-input v-model="queryForm.tmsOrderNo" placeholder="TMS订单号" class="width140" clearable></el-input>
        </el-form-item>
        <el-form-item label="运输方式">
          <el-select v-model="queryForm.transportTypeName" class="width140" clearable>
            <el-option label="汽车" value="0"></el-option>
            <el-option label="火车" value="1"></el-option>
            <el-option label="集装箱" value="2"></el-option>
            <el-option label="散船" value="3"></el-option>
            <el-option label="其它" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="OMS订单号">
          <el-input v-model="queryForm.omsOrderNo" placeholder="OMS订单号" class="width140" clearable></el-input>
        </el-form-item>
        <el-form-item label="驾驶员">
          <el-input v-model="queryForm.driverName" placeholder="驾驶员" class="width140" clearable></el-input>
        </el-form-item>
        <el-form-item label="LHB运单号">
          <el-input v-model="queryForm.cargoWaybillNo" placeholder="LHB运单号" class="width140" clearable></el-input>
        </el-form-item>
        <el-form-item label="预配载单号">
          <el-input v-model="queryForm.stowageOrderNo" placeholder="预配载单号" class="width140" clearable></el-input>
        </el-form-item>
        <el-form-item label="客户订单号">
          <el-input v-model="queryForm.customerOrderNo" placeholder="客户订单号" class="width140" clearable></el-input>
        </el-form-item>
        <el-form-item label="始发地">
          <el-cascader v-model.trim="queryForm.fromAddressProvinceName" :options="cityAreaOptions" :change-on-select="true" class="width160" clearable></el-cascader>
        </el-form-item>
        <el-form-item label="目的地">
          <el-cascader v-model.trim="queryForm.toAddressProvinceName" :options="cityAreaOptions" :change-on-select="true" class="width160" clearable></el-cascader>
        </el-form-item>
        <el-form-item label="签收日期">
          <el-date-picker v-model="queryForm.signatureTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="要求送达日期">
          <el-date-picker v-model="queryForm.serviceDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item class="query_btns">
          <el-button type="success" @click="queryList">查 询</el-button>
          <el-button type="info" @click="resetQueryForm">重 置</el-button>
          <span class="more_btn themeColor" @click="showMore = false">收起选项 <i class="el-icon-arrow-up"></i></span>
        </el-form-item>
      </el-form>
    </div>
    <div class="table_box">
      <div class="table_btns">
        <el-button type="primary" @click="cancelWaybill">撤销运单</el-button>
        <el-button type="primary" @click="ship">起运</el-button>
        <el-button type="primary" @click="cancelStartShip">取消起运</el-button>
        <el-button type="primary" @click="sign('addSign')">运单签收</el-button>
        <el-button type="primary" @click="sign('updateSign')">修改签收</el-button>
      </div>
      <!--表格列宽度 中：160； 小：100； 大：200特殊-->
      <div class="table_content">
        <el-table border ref="moviesTable" :data="page.list" height="100%" @selection-change="tableSelect">
          <el-table-column type="selection" width="35"></el-table-column>

          <el-table-column width="44" show-overflow-tooltip>
            <template slot="header" slot-scope="scope">
              <!--表格可配 触发按钮-->
              <label class="themeColor">
                <svg-icon @click="tableSet.show = true" class="cursor_p" icon-class="setTable_setting"/>
              </label>
            </template>
            <template slot-scope="scope">{{scope.$index+1+page.pageSize*(page.pageNum-1)}}</template>
          </el-table-column>

          <!--表格可配 循环展示数据-->
          <el-table-column v-if= "setT.display" :label="setT.columnName" :width="setT.columnWidth" v-for="(setT,index) in tableSet.list" :key="index" show-overflow-tooltip>
            <template slot-scope="scope">
              <!--格式化 运单状态-->
              <span v-if="setT.columnCode == 'waybillStatus'" v-html="waybillStatusFmt(scope.row, setT.columnCode)"></span>
              <!--格式化 签收状态-->
              <span v-else-if="setT.columnCode == 'signatureStatus'" v-html="signatureStatusFmt(scope.row, setT.columnCode)"></span>
              <!--格式化 支付状态-->
              <span v-else-if="setT.columnCode == 'paymentStatus'" v-html="paymentStatusFmt(scope.row, setT.columnCode)"></span>
              <!--格式化 生成运单时间-->
              <span v-else-if="setT.columnCode == 'addTime'" v-html="formatTimes(scope.row, setT.columnCode)"></span>
              <!--格式化 始发地-->
              <span v-else-if="setT.columnCode == 'fromAddressProvinceName'" v-html="formatFromAddrFmt(scope.row, setT.columnCode)"></span>
              <!--格式化 目的地-->
              <span v-else-if="setT.columnCode == 'toAddressProvinceName'" v-html="formatToAddrFmt(scope.row, setT.columnCode)"></span>
              <!--格式化 起运时间-->
              <span v-else-if="setT.columnCode == 'receiptTime'" v-html="formatTimes(scope.row, setT.columnCode)"></span>
              <!--格式化 回单状态-->
              <span v-else-if="setT.columnCode == 'receiptStatus'" v-html="receiptStatusFmt(scope.row, setT.columnCode)"></span>
              <!--格式化 要求送达时间-->
              <span v-else-if="setT.columnCode == 'serviceDate'" v-html="formatTimes(scope.row, setT.columnCode)"></span>
              <!--格式化 签收时间-->
              <span v-else-if="setT.columnCode == 'signatureTime'" v-html="formatTimes(scope.row, setT.columnCode)"></span>
              <span v-else>{{scope.row[setT.columnCode]}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" min-width="170" align="center" label="操作">
            <template slot-scope="scope">
              <span @click="detailWaybill(scope.row.id)" class="table_handle">
                <label class="themeColor">
                  <svg-icon icon-class="table_detail"/>
                </label>
                <span>详情</span>
              </span>
              <span @click="confirmWaybill(scope.row)" class="table_handle">
                <label class="themeColor">
                  <svg-icon icon-class="table_pen"/>
                </label>
                <span>修改运单</span>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <setting-table @update="resetQueryForm" :tableData="tableSet"></setting-table>
    <div class="bottom_box pt20">
      <export-data class="fl" :exportParams="exportParams" :exportUrl="'/xxx/xxx'" :name="'文件名称.xls'" :list="page.list" :tableSelect="[]"></export-data>
      <pagination class="fr" @search="getList" :page="page"></pagination>
    </div>
    <!--起运-->
    <el-dialog title="起运" :visible.sync="isStartVisibleShow" width="400px" :close-on-click-modal="false" :before-close="cancel" class="add-edit-reset dialog-reset dialog-padding0 del-reset">
      <div class="padding30">
        <el-form :model="chooseDateTime" ref="chooseDateTime" :label-position="labelPosition" label-width="90px" class="demo-ruleForm">
          <el-form-item label="起运时间" required>
            <el-date-picker type="datetime" placeholder="选择日期" v-model="chooseDateTime.shipmentTime" class="width200" default-time="12:00:00"></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancel" class="cancel">取 消</el-button>
        <el-button size="small" type="primary" @click="shipmentSave" class="sure">确 定</el-button>
      </span>
    </el-dialog>
    <!--详情-->
    <vDetail :detailParam="detail"></vDetail>
    <!--运单签收或修改签收-->
    <vSign :signParam="signWaybill" @update="getList"></vSign>
    <!--修改运单-->
    <updateWaybill :updateParam="updateWaybill" @update="getList"></updateWaybill>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import {methodPost} from "@/api";
import settingTable from '@/components/utils/settingTable'; // 表格配置
import exportData from '@/components/utils/exportData'; // 导出
import pagination from '@/components/utils/pagination'; // 分页
import areaDatas from '@/assets/scripts/area' // 区域
import vDetail from './detail' // 详情
import vSign from './sign' // 运单签收 修改签收
import updateWaybill from './confirm' // 修改运单

export default {
  name: "list",
  components: {settingTable, exportData, pagination, vDetail, updateWaybill, vSign},
  computed: {
    ...mapState({
      pageObj: state => state.pageObj
    }),
    ...mapGetters(['getBtn'])
  },
  data() {
    return {
      labelPosition: 'left',
      showMore: false, // 是否展示更多
      // 表格配置对象
      tableSet: {
        name: 'waybillPage:table', // 表格标识名称
        show: false, // 是否显示表格配置窗口
        list: [] // 表格列显示
      },
      queryForm: {}, // 查询列表数据参数
      queryFormParams: null, // 用于请求数据时参数隔离
      exportParams: null, // 导出参数 每次查询数据时更新参数
      page: {
        total: 0,
        pageIndex: 1,
        pageSize: 20,
        list: [] // 列表
      },
      isStartVisibleShow: false, // 起运
      // 起运时间
      chooseDateTime: {
        shipmentTime: ''
      },
      // 运单详情
      detail: {
        show: false
      },
      // 运单签收修改签收
      signWaybill: {
        show: false
      },
      // 修改运单
      updateWaybill: {
        show: false
      },
      cityAreaOptions: [],
      tableSelectIn: [] // 被选中的列表
    }
  },
  created() {
    this.cityAreaOptions = areaDatas.getAreas();
    this.page = this.pageObj;
  },
  methods: {
    /**
     * 表格 多选框触发
     */
    tableSelect(_item) {
      this.tableSelectIn = _item;
    },
    /**
     * 重置搜索条件
     */
    resetQueryForm() {
      this.queryForm = {};
      this.queryList();
    },
    /**
     * 通过条件查询数据 将请求参数隔离避免参数污染
     */
    queryList() {
      this.page.pageIndex = 1;
      if (this.queryForm.fromAddressProvinceName) {
        this.queryForm.fromProvinceCode = this.queryForm.fromAddressProvinceName[0];
        this.queryForm.fromCityCode = this.queryForm.fromAddressProvinceName[1];
        this.queryForm.fromCountryCode = this.queryForm.fromAddressProvinceName[2];
      }
      if (this.queryForm.toAddressProvinceName) {
        this.queryForm.toProvinceCode = this.queryForm.toAddressProvinceName[0];
        this.queryForm.toCityCode = this.queryForm.toAddressProvinceName[1];
        this.queryForm.toCountryCode = this.queryForm.toAddressProvinceName[2];
      }
      if (this.queryForm.signatureTime) {
        this.queryForm.signatureTimeBegin = this.queryForm.signatureTime[0];
        this.queryForm.signatureTimeEnd = this.queryForm.signatureTime[1];
      }
      if (this.queryForm.serviceDate) {
        this.queryForm.startServiceTime = this.queryForm.serviceDate[0];
        this.queryForm.endServiceTime = this.queryForm.serviceDate[1];
      }
      this.queryFormParams = JSON.parse(JSON.stringify(this.queryForm));
      this.$delete(this.queryFormParams, 'fromAddressProvinceName');
      this.$delete(this.queryFormParams, 'toAddressProvinceName');
      this.$delete(this.queryFormParams, 'signatureTime'); // 签收日期
      this.$delete(this.queryFormParams, 'serviceDate');
      this.exportParams = JSON.parse(JSON.stringify(this.queryForm));
      this.getList();
    },
    /**
     * 获取列表数据
     */
    getList() {
      this.queryFormParams.pageNum = this.page.pageIndex;
      this.queryFormParams.pageSize = this.page.pageSize;
      methodPost('/tms/tmsWaybill/getPageList', this.queryFormParams, true).then(res => {
        if (res.code === 10000) {
          let data = res.result;
          this.page.list = data.list;
          this.page.total = data.total;
          this.page.pageIndex = data.pageNum;
        } else {
          this.$message({showClose: false, center: true, message: res.remark, type: 'error'});
        }
      });
    },
    /**
     *  撤销运单
     * */
    cancelWaybill() {
      let _this = this;
      if (_this.tableSelectIn.length > 1) {
        _this.$message.warning("取消运单只能单选！");
        return false;
      }
      if (_this.tableSelectIn.length === 0) {
        _this.$message.warning("请选择需要操作的运单！");
        return false;
      } else {
        let flag = true;
        _this.tableSelectIn.forEach(item => {
          if (item.waybillStatus === 1 || item.waybillStatus === 2) {
            flag = false;
            _this.$message.warning("运输中或已完成的运单不能撤销！");
            return false;
          }
          if (item.paymentStatus === 1) {
            flag = false;
            _this.$message.warning("已支付的运单不能撤销！");
          }
        });
        if (flag) {
          _this.$confirm('请确认是否取消运单？', '撤销运单',
            {closeOnClickModal: false, cancelButtonClass: 'el-button--info'}
          ).then(() => { // 点击确定
            let ids = [];
            _this.tableSelectIn.forEach(item => {
              ids.push(item.id);
            });
            methodPost('/tms/tmsWaybill/undoWaybill', ids, true).then(res => {
              if (res.code === 10000) {
                _this.$message.success(res.remark);
                _this.queryList();
              } else {
                _this.$message.error(res.remark);
              }
            });
          }).catch(() => { // 点击取消
          });
        }
      }
    },
    /**
     *  起运
     * */
    ship() {
      let _this = this;
      if (_this.tableSelectIn.length === 0) {
        _this.$message.warning("请选择需要操作的运单！");
        return false;
      } else {
        let flag = true;
        _this.tableSelectIn.forEach(item => {
          if (item.waybillStatus === 1 || item.waybillStatus === 2) {
            flag = false;
            _this.$message.warning("运输中或已完成的运单不能起运！");
            return false;
          }
        });
        if (flag) {
          this.isStartVisibleShow = true;
        }
      }
    },
    /**
     *  确定起运
     * */
    shipmentSave() {
      let _this = this;
      if (!_this.chooseDateTime.shipmentTime) {
        _this.$message.warning("请选择起运时间！");
        return false;
      } else {
        let waybillIds = [];
        _this.tableSelectIn.forEach(item => {
          waybillIds.push(item.id);
        });
        methodPost('/tms/tmsWaybill/startShipment?departureTime=' + _this.chooseDateTime.shipmentTime + '', waybillIds, true).then(res => {
          if (res.code === 10000) {
            _this.isStartVisibleShow = false;
            _this.$message.success("起运成功！");
            _this.queryList();
          } else {
            _this.$message.error(res.remark);
          }
        });
      }
    },
    /**
     *  取消起运
     * */
    cancelStartShip() {
      let _this = this;
      if (_this.tableSelectIn.length === 0) {
        _this.$message.warning("请选择需要操作的运单！");
        return false;
      } else {
        let flag = true;
        _this.tableSelectIn.forEach(item => {
          if (item.waybillStatus === 0 || item.waybillStatus === 2) {
            flag = false;
            _this.$message.warning("待起运或已完成的运单不能取消起运！");
            return false;
          }
        });
        if (flag) {
          this.$confirm('请确认是否取消起运订单？', '取消起运',
            {closeOnClickModal: false, cancelButtonClass: 'el-button--info'}
          ).then(() => { // 点击确定
            let waybillIds = [];
            _this.tableSelectIn.forEach(item => {
              waybillIds.push(item.id);
            });
            methodPost('/tms/tmsWaybill/cancelShipment', waybillIds, true).then(res => {
              if (res.code === 10000) {
                _this.$message.success("取消起运成功！");
                _this.queryList();
              } else {
                _this.$message.error(res.remark);
              }
            })
          }).catch(() => { // 点击取消
          });
        }
      }
    },
    /**
     *  清空表单
     * */
    cancel() {
      this.isStartVisibleShow = false;
      this.chooseDateTime = {};
    },
    /**
     *  运单签收
     * */
    sign(flag) {
      let _this = this;
      if (flag === "addSign") { // 运单签收
        let waybillIds = [];
        if (_this.tableSelectIn.length === 0) {
          _this.$message.warning("请选择需要签收的运单！");
          return false;
        } else {
          let fl = true;
          _this.tableSelectIn.forEach(item => {
            if (item.waybillStatus !== 1) {
              _this.$message.warning("不是运输中的运单，不能进行签收！");
              fl = false;
              return false;
            } else {
              waybillIds.push(item.id); // 运单idList
            }
          });
          if (fl) {
            methodPost('/tms/waybill/signature/getWaybillSignList', waybillIds, true).then(res => {
              if (res.code === 10000) {
                res.result.forEach(i => {
                  i.signDetailList.forEach(j => {
                    if (j.isDelayed === 1) { // 格式化是否加急
                      j.isDelayed = true;
                    } else {
                      j.isDelayed = false;
                    }
                    j.signatureWeight = ((j.signatureQuantity) * 1).toFixed(2); // 正常签收数量默认值计算体积和重量
                    j.signatureVolume = ((j.signatureQuantity) * 1).toFixed(2);
                  })
                });

                _this.signWaybill = Object.assign({}, {
                  show: true,
                  title: '运单签收',
                  signLists: res.result
                });
              } else {
                _this.$message.error(res.remark);
              }
            });
          }
        }
      } else { // 修改签收
        if (_this.tableSelectIn.length === 0) {
          _this.$message.warning("请选择需要修改签收的运单！");
          return false;
        } else {
          let flags = true;
          let waybillIds = [];
          _this.tableSelectIn.forEach(item => {
            if (item.signatureStatus === 0 || item.signatureStatus === 1 || item.signatureStatus === 3) {
              flags = false;
              _this.$message.warning("不是异常签收的运单，不能进行修改签收！");
              return false;
            } else {
              waybillIds.push(item.id); // 运单idList
            }
          });
          if (flags) {
            methodPost('/tms/waybill/signature/getWaybillSignList', waybillIds, true).then(res => {
              if (res.code === 10000) {
                res.result.forEach(i => {
                  i.signDetailList.forEach(j => {
                    if (j.isDelayed === 1) { // 格式化是否加急
                      j.isDelayed = true;
                    } else {
                      j.isDelayed = false;
                    }
                    j.signatureWeight = ((j.signatureQuantity) * 1).toFixed(2); // 正常签收数量默认值计算体积和重量
                    j.signatureVolume = ((j.signatureQuantity) * 1).toFixed(2);
                  })
                });
                _this.signWaybill = Object.assign({}, {
                  show: true,
                  title: '修改签收',
                  signLists: res.result
                })
              }
            });
          }
        }
      }
    },
    /**
     *  修改运单
     * */
    confirmWaybill(row) {
      let _this = this;
      if (row.waybillStatus !== 0) {
        _this.$message.warning("不是待起运的运单不能修改！");
        return false;
      }
      methodPost('/tms/tmsWaybill/getWaybill', {id: row.id}, true).then(res => {
        if (res.code === 10000) {
          let formAddr = [];
          let toAddr = [];
          formAddr.push(res.result.fromAddressProvince); // 回显始发地和目的地 push code
          formAddr.push(res.result.fromAddressCity);
          formAddr.push(res.result.fromAddressCounty);
          formAddr.push(res.result.fromAddressProvinceName); // 回显始发地和目的地 push code
          formAddr.push(res.result.fromAddressCityName);
          formAddr.push(res.result.fromAddressCountyName);
          toAddr.push(res.result.toAddressProvince);
          toAddr.push(res.result.toAddressCity);
          toAddr.push(res.result.toAddressCounty);
          toAddr.push(res.result.toAddressProvinceName);
          toAddr.push(res.result.toAddressCityName);
          toAddr.push(res.result.toAddressCountyName);
          res.result = Object.assign({}, res.result, {
            loadNumber: '',
            loadWeight: '',
            loadVolume: '',
            formAddr: formAddr,
            toAddr: toAddr
          });

          res.result.detailsList.forEach(item => {
            item.totalStowageAmountAndWaybillAmount = item.stowageAmount + item.waybillAmount;
          });
          _this.updateWaybill = Object.assign({}, {
            show: true,
            baseInfo: res.result,
            detailsList: res.result.detailsList
          });
        }
      });
    },
    /**
     * 运单详情
     * */
    detailWaybill(waybillId) {
      this.detail = Object.assign({}, {title: '详情', show: true, waybillId: waybillId});
    }
  }
}
</script>

<style scoped>
  .width200 {
    width: 200px !important;
  }
</style>
