// 公用分页方法
jQuery.fn.extend({

     /**
      *获取分页条
      * @param pageTotal 总页数
      * @param curPage 当前页码
      * @param fun 拼接参数+页码 URL
      */
    getPageBar: function(pageTotal,curPage,fun){
         var pageTotal = parseInt(pageTotal);
         var curPage = parseInt(curPage);
        this.empty();
        if (!(pageTotal && pageTotal > 1)) {
            return;
        }
        //省略拼接字符串
        var pageOmitStr = "<a class='spotStyle'><img src='/image/ellipsis.png' /></a>";
        //最后一页页码显示元素
        var pageEndStr = "";
        if(curPage == pageTotal){
            pageEndStr = "<a class='onStyle on' href='"+ fun(pageTotal)+"'>"+pageTotal+"</a>";
        }else {
            pageEndStr = "<a class='onStyle' href='" + fun(pageTotal)+"'>"+pageTotal+"</a>";
        }

        //需显示的分页元素
        var pageStr = "<p class='page_num'>";

        //控制页码过多
        if(curPage>=7){
            //最后一页到当前页区间值-pageArea
            var pageArea = pageTotal - curPage;
            pageStr = pageStr + "<a class='onStyle' href='"+fun(1)+"'>"+1+"</a>";
            pageStr += pageOmitStr;
            for(var i=curPage-4;i<curPage;i++){
                pageStr = pageStr + "<a class='onStyle' href='"+fun(i)+"'>"+i+"</a>";
            }
            if(pageArea >5){
                for(var j=curPage;j<curPage+5;j++){
                    if(j==curPage){
                        pageStr = pageStr+ "<a class='onStyle on' href='"+fun(j)+"'>"+j+"</a>"
                    }else{
                        pageStr = pageStr + "<a class='onStyle' href='"+fun(j)+"'>"+j+"</a>";
                    }
                }
                pageStr += pageOmitStr;
            }else{
                for(var j=curPage;j<pageTotal;j++){
                    if(j==curPage){
                        pageStr = pageStr+ "<a class='onStyle on' href='"+fun(j)+"'>"+j+"</a>"
                    }else{
                        pageStr = pageStr + "<a class='onStyle' href='"+fun(j)+"'>"+j+"</a>";
                    }
                }
            }
            //最后一页显示分页元素
            pageStr += pageEndStr;
        }else {
            var showPageNum = 0;
            //大于十页，显示前十页
            if(pageTotal>10){
                showPageNum = 10;
            }else {
                showPageNum = pageTotal;
            }
            for(var i=1;i<=showPageNum;i++){
                if(i==curPage){
                    pageStr = pageStr+ "<a class='onStyle on' href='"+fun(i)+"'>"+i+"</a>"
                }else {
                    pageStr = pageStr+ "<a class='onStyle' href='"+fun(i)+"'>"+i+"</a>"
                }

            }
            if(pageTotal>10){
                pageStr += pageOmitStr;
                pageStr += pageEndStr;
            }
        }
        //显示下一页按钮
        if(curPage != pageTotal){
            var nextPageNum = parseInt(curPage) + parseInt(1);
            pageStr = pageStr+ "<a class='next' id='nextpageid' href='"+ fun(nextPageNum) +"'>"+"下一页"+"&gt;</a></p>";
        }
        //显示上一页按钮
        var prevPage="";
        if(curPage != 1){
            var prevPageNum = parseInt(curPage) - parseInt(1);
            prevPageNum = prevPageNum < 1 ? 1 : prevPageNum;
            prevPage = "<a class='prev' id='prevpageid' href='"+ fun(prevPageNum) +"'>&lt;"+"上一页"+"</a>";
        }
        if(curPage == 1 && pageTotal==1){
            $(".next , .prev").css("display","none");
            pageStr = "<a class='onStyle on' href='"+fun(1)+"'>1</a>";
        }
        this.append(pageStr).find(".page_num").prepend(prevPage);
    },


    /*
     * 获取分页条
     * pagetotal 总页数
     * curPage   当前页码
     * 异步分页
     * */
    getPageBarAjax: function (pageTotal,curPage) {
        var pageTotal = parseInt(pageTotal);
        var curPage = parseInt(curPage);
        this.empty();
        if (!(pageTotal && pageTotal > 1)) {
            return;
        }
        //省略拼接字符串
        var pageOmitStr = "<a class='spotStyle'><img src='/image/ellipsis.png' /></a>";
        //最后一页页码显示元素
        var pageEndStr = "";
        if(curPage == pageTotal){
            pageEndStr = "<a class='onStyle on' pageNo='"+pageTotal+"'>"+pageTotal+"</a>";
        }else {
            pageEndStr = "<a class='onStyle' pageNo='"+pageTotal+"'>"+pageTotal+"</a>";
        }

        //需显示的分页元素
        var pageStr = "<p class='page_num'>";

        //控制页码过多
        if(curPage>=7){
            //最后一页到当前页区间值-pageArea
            var pageArea = pageTotal - curPage;
            pageStr = pageStr + "<a class='onStyle' pageNo='"+1+"'>"+1+"</a>";
            pageStr += pageOmitStr;
            for(var i=curPage-4;i<curPage;i++){
                pageStr = pageStr + "<a class='onStyle' pageNo='"+i+"' >"+i+"</a>";
            }
            if(pageArea >5){
                console.log(curPage+5);
                for(var j=curPage;j<curPage+5;j++){
                    if(j==curPage){
                        pageStr = pageStr+ "<a class='onStyle on' pageNo='"+j+"' >"+j+"</a>"
                    }else{
                        pageStr = pageStr + "<a class='onStyle' pageNo='"+j+"' >"+j+"</a>";
                    }
                }
                pageStr += pageOmitStr;
            }else{
                for(var j=curPage;j<pageTotal;j++){
                    if(j==curPage){
                        pageStr = pageStr+ "<a class='onStyle on' pageNo='"+j+"' >"+j+"</a>"
                    }else{
                        pageStr = pageStr + "<a class='onStyle' pageNo='"+j+"' >"+j+"</a>";
                    }
                }
            }
            //最后一页显示分页元素
            pageStr += pageEndStr;
        }else {
            var showPageNum = 0;
            //大于十页，显示前十页
            if(pageTotal>10){
                showPageNum = 10;
            }else {
                showPageNum = pageTotal;
            }
            for(var i=1;i<=showPageNum;i++){
                if(i==curPage){
                    pageStr = pageStr+ "<a class='onStyle on' pageNo='"+i+"' >"+i+"</a>"
                }else {
                    pageStr = pageStr+ "<a class='onStyle' pageNo='"+i+"' >"+i+"</a>"
                }

            }
            if(pageTotal>10){
                pageStr += pageOmitStr;
                pageStr += pageEndStr;
            }
        }
        //显示下一页按钮
        if(curPage != pageTotal){
            var nextPageNum = parseInt(curPage) + parseInt(1);
            pageStr = pageStr+ "<a class='next' id='nextpageid' pageNo='"+nextPageNum+"' >"+"下一页"+"</a></p>";
        }
        //显示上一页按钮
        var prevPage="";
        if(curPage != 1){
            var prevPageNum = parseInt(curPage) - parseInt(1);
            prevPage = "<a class='prev' id='prevpageid' pageNo='"+prevPageNum+"' >"+"上一页"+"</a>";
        }
        if(curPage == 1 && pageTotal==1){
            $(".next , .prev").css("display","none");
            pageStr = "<a class='onStyle on' pageNo='"+1+"' >1</a>";
        }
        this.append(pageStr).find(".page_num").prepend(prevPage);
    }
});
