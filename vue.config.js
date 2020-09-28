const fs = require("fs");
function Pagination(size, page, alldata) {
  let skipnum = (page - 1) * size;
  let newarr =
    skipnum + size >= alldata.length
      ? alldata.slice(skipnum, alldata.length)
      : alldata.slice(skipnum, skipnum + size);
  return newarr;
}
function sortby(attr, rev) {
  rev = rev ? 1 : -1;
  return function(a, b) {
    a = a[attr];
    b = b[attr];
    if (a < b) {
      return a * -rev;
    }
    if (a > b) {
      return a * rev;
    }
    return 0;
  };
}
function range(a, gt, lte) {
  return a.filter((item) => item.salePrice > gt && item.salePrice < lte);
}

//npm install jsonwebtoken -s
//cors跨域请求的中间件
//bodyparser是post请求的中间件
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyparser = require("body-parser");
module.exports = {
  devServer: {
    before(app, serve) {
      app.use(cors());
      app.use(bodyparser.json());
      app.use(bodyparser.urlencoded({ extended: false }));
      //访问home页面的端口
      app.get("/api/goods/home", (req, res) => {
        fs.readFile("./bd/home.json", "utf8", (err, data) => {
          if (!err) {
            res.json(JSON.parse(data));
          } else {
            console.log(err);
          }
        });
      });
      //访问所有商品和品牌周边的端口
      app.get("/api/goods/allgoods", (req, res) => {
        //query会获取问好后面的查询参数

        const page = parseInt(req.query.page); //第几页
        const size = parseInt(req.query.size); //每页显示的数量
        const sort = parseInt(req.query.sort); //排序，正序/倒叙/正常
        const gt = parseInt(req.query.priceGt); //价格由低到高
        const lte = parseInt(req.query.priceLte); //价格由高到低
        const cid = req.query.cid; //获取品牌周边
        let newData = [];
        fs.readFile("./bd/allgoods.json", "utf8", (err, data) => {
          let { result } = JSON.parse(data);
          let alldata = result.data;
          newData = Pagination(size, page, alldata);
          if (cid == "1184") {
            console.log(1111);
          } else {
            if (sort == 1) {
              //价格由低到高
              newData = newData.sort(sortby("salePrice", true));
            } else if (sort == -1) {
              //价格由高到低
              newData = newData.sort(sortby("salePrice", false));
            }
            if (gt && lte) {
              newData = range(newData, gt, lte);
            }
          }
          if (newData.length < size) {
            res.json({
              data: newData,
              total: newData.length,
            });
          } else {
            res.json({
              data: newData,
              total: alldata.length,
            });
          }
        });
      });
      //访问数据详情的端口
      app.get("/api/goods/productDet", (req, res) => {
        let productId = req.query.productId;
        fs.readFile("./bd/goodsDetail.json", "utf8", (err, data) => {
          if (!err) {
            let alldata = JSON.parse(data);

            // let newdata = alldata.resultfilter((item) => {
            //   return item.productId == productId;
            // });
            // console.log(alldata);
            res.json({
              data: alldata,
              productId: productId,
            });
          }
        });
      });
      app.post("/api/login", (req, res) => {
        //登录成功获取用户名
        let username = req.body.user;
        //一系列的操作
        res.json({
          //进行加密的方法
          //sign 参数1：加密的对象 参数2：加密的规则 参数3：对象
          token: jwt.sign({ username: username }, "abcd", {
            //过期时间
            expiresIn: "3000s",
          }),
          username,
          state: 1,
          file: "/static/images/15706001798700.png",
          code: 200,
          address: null,
          balance: null,
          desriptions: null,
          email: null,
          message: null,
          phone: null,
          points: null,
          sex: null,
          id: 62,
        });
      });
      app.post("/api/validata", function(req, res) {
        let token = req.header.authorization;
        console.log(token);
        //验证token合法性，对token进行解码
        jwt.verify(token, "abcd", function(err, decode) {
          if (err) {
            res.json({
              msg: "当前用户未登录",
            });
          } else {
            //证明用户已经登录
            res.json({
              token: jwt.sign({ username: decode.username }, "abcd", {
                //过期时间
                expiresIn: "3000s",
              }),
              username: decode.username,
              msg: "已登录",
              address: null,
              balance: null,
              desriptions: null,
              email: null,
              file: "/static/images/15706001798700.png",
              id: 62,
              message: null,
              phone: null,
              points: null,
              sex: null,
              state: 1,
            });
          }
        });
      });
    },
  },
};
