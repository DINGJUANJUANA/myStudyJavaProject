import com.mysql.jdbc.Connection;
import com.mysql.jdbc.Statement;
import com.sun.org.apache.bcel.internal.classfile.StackMapType;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by Administrator on 2018-09-14.
 */
@WebServlet(name = "DatabaseAccess")
public class DatabaseAccess extends HttpServlet {
    private static final long serialVersionUID = 1L;

    //jdbc
    static final String JDBC_DRIVER="com.mysql.jdbc.Driver";
    static final  String DB_URL="jdbc:mysql://localhost:3306/test";
    static final String USER="root";
    static final String PASS="sa0077";

    public DatabaseAccess(){
        supper();
    }

    private void supper() {
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Connection conn=null;
        Statement stmt=null;

        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out=response.getWriter();
        String title="Servlet Mysql Test";
        String docTye="";
        try{

            Class.forName("com.mysql.jdbc.Driver");
            conn= (Connection) DriverManager.getConnection(DB_URL,USER,PASS);
            stmt= (Statement) conn.createStatement();
            String sql;
            sql="select * from p_user_info";
            ResultSet rs=stmt.executeQuery(sql);
            while (rs.next()){
                String username=rs.getString("user_name");
                out.println("username:"+username+"/n");
            }
            rs.close();
            stmt.close();
            conn.close();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            try{
                if(stmt!=null)
                    stmt.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
            try{
                if(conn!=null)
                    conn.close();
            }catch(SQLException se){
                se.printStackTrace();
            }
        }

    }
}
