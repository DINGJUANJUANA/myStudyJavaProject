import javax.servlet.*;
import java.io.IOException;

/**
 * Created by Administrator on 2018-09-14.
 */
public class LogFilter implements Filter {
    public void  init(FilterConfig config) throws ServletException {
        // 获取初始化参数
        String site = config.getInitParameter("Site");
        // 输出初始化参数
        System.out.println("网站名称: " + site);
    }

    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
       // 输出站点名称
        System.out.println("站点网址：http://www.runoob.com");
        // 把请求传回过滤链
        filterChain.doFilter(servletRequest,servletResponse);
    }

    public void destroy() {

    }
}
