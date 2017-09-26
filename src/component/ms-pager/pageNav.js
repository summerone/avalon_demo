/**
 * Created by lsq on 2017/4/25.
 */
avalon.component('ms-pager', {
    template: require('./pageNav.html'),
    defaults: {
        isDisabled: function (name, page) {
            return this.$buttons[name] = (this.currentPage === page)
        },
        $buttons: {},
        showPages: 2,
        pages: [],
        skipToNum:'',
        totalPages: 15,
        currentPage: 1,
        prevText: 'Previous',
        nextText: 'Next',
        onPageClick: avalon.noop,
        toPage: function (p) {
            var cur = this.currentPage;
            var max = this.totalPages;
            switch (p) {
                case 'prev':
                    return Math.max(cur - 1, 0);
                case 'next':
                    return Math.min(cur + 1, max);
                default:
                    return p
            }
        },
        getAjax: function(cur){    //获取数据的方法(自定义)

        },
        enter:function($event){     //跳转回车方法
            if($event.keyCode == 13 && this.skipToNum != ''){
                this.cbProxy($event,this.skipToNum);
            }else{
                return
            }
        },
        cbProxy: function (e, p) {
            if (this.$buttons[p] || p === this.currentPage || p =='' || p > this.totalPages || p <= 0) {
                e.preventDefault();
                return; //disabled, active不会触发
            }
            // debugger;
            var cur = this.toPage(p);
            this.render(cur);
            this.getAjax(cur,p);
            return this.onPageClick(e, p)
        },

        render: function(cur){
            var obj = getPages.call(this, cur);
            this.pages = obj.pages;
            this.currentPage = obj.currentPage
        },
        onInit: function () {
            debugger;
            var cur = this.currentPage;
            var that = this;
            this.$watch('totalPages', function(){
                setTimeout(function(){
                    that.render(that.currentPage)
                },4)
            });
            this.$watch('currentPage', function(){
                setTimeout(function(){
                    that.render(that.currentPage)
                },4)
            });
            this.render(cur)
        }
    }
});
function getPages(currentPage) {
    var pages = [];
    var s = this.showPages;
    var total = this.totalPages;
    var half = Math.floor(s / 2);
    var start = currentPage - half + 1 - s % 2;
    var end = currentPage + half;

    // handle boundary case
    if (start <= 0) {
        start = 1;
        end = s;
    }
    if (end > total) {
        start = total - s + 1;
        end = total
    }

    var itPage = start;
    while (itPage <= end) {
        pages.push(itPage);
        itPage++
    }
    return {currentPage: currentPage, pages: pages};
}
