/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import _ from 'lodash';
import template from './kbn_timepicker_quick_panel.html';
import { uiModules } from '../../modules';

const module = uiModules.get('ui/timepicker');

module.directive('kbnTimepickerQuickPanel', function (config) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      setQuick: '&'
    },
    template,
    controller: function ($scope, $window) {
      const quickRanges = config.get('timepicker:quickRanges');
      const filterQuickRanges = $window.oneDayLimit ? quickRanges
        .filter(q=>'now/d,now-15m,now-30m,now-1h,now-4h,now-12h,now-24h'.indexOf(q.from) > -1) : quickRanges;
      $scope.quickLists = _(filterQuickRanges).groupBy('section').values().value();
    }
  };
});
