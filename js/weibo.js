class Publish {
	constructor() {
	    this.login = document.querySelector("#login");
		this.container = document.querySelector("#container");
		this.content = document.querySelector("#content");
		this.aLi = Array.from(this.content.querySelectorAll("li"));
		this.bindEvent();
		this.delBtn = document.querySelector("#delBtn");
		
	}
	bindEvent () {
		this.login.onclick = this.onLogin.bind(this);
		// 关闭
		// console.log(this.onLogin);
		// this.closeBtn = this.container.querySelector("#closeBtn");
		// console.log(this.closeBtn);
		this.container.onclick = e => {
			switch (e.target.id){
				case "loginBtn":
				 this.title = this.container.querySelector("#username").value;
				 this.text = this.container.querySelector("#text").value;
				 this.change(this.title, this.text);
				case "closeBtn":
				this.container.style.display = "none";
				this.model.remove();
					break
			}
		}
		// console.log(this.content);
		for(let i = 0;i < this.aLi.length; i++){
			this.aLi[i].oncontextmenu = this.liFn.bind(this);
			this.delBtn.onclick = this.remove.bind(this,i);
		}
	}
	change (title, text) {
		let date = new Date();
		let timeStr = `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
		this.li = document.createElement("li");
		this.li.innerHTML = "标题" + "&nbsp;" + title + "<br>" + "内容" + "&nbsp;" + text + "<br>" + timeStr;
		this.content.appendChild(this.li);
		this.content.style.display = "block";
		this.aLi = Array.from(this.content.querySelectorAll("li"));
		this.bindEvent ();
	}
	liFn (e) {
		console.log(1)
		this.delBtn.style.display = "block";
		// console.log(this.delBtn)
		// console.log(e);
		this.delBtn.style.left = e.clientX +"px";
		this.delBtn.style.top = e.clientY + "px";
		// return false;
		e.preventDefault();
	}
	remove(i){
		console.log(i);
		this.aLi[i].remove();
		this.delBtn.style.display = "none";
		this.aLi = Array.from(this.content.querySelectorAll("li"));
		this.bindEvents();
	}
	
	onLogin () {
		this.container.innerHTML = `<h4>微博编辑</h4>
		<a id="closeBtn" class="close_btn" href="javascript:;">×</a>
		<p><label>标　题：<input id="username" type="text"></label></p>
		<p><label>内　容：<br/><textarea id = "text"></textarea></label></p>
		<p><button id="loginBtn" class="logonBtn" type="button" style="float : right;margin-right :50px">发布</button></p>`;
		// 居中显示
		this.container.style.display = "block";
		// juzhong
		// console.log(this.center);
		window.onresize = this.center.bind(this);
		this.center ();
		// 遮罩
		this.modelFn();
	}
	// 遮罩
	modelFn () {
		this.model = document.createElement("div");
		this.model.className = "modal";
		document.body.appendChild(this.model);
	}
	center () {
		var left = (document.documentElement.clientWidth - this.container.offsetWidth) / 2;
		var top = (document.documentElement.clientHeight - this.container.offsetHeight) / 2;
		this.container.style.left = left + "px";
		this.container.style.top = top + "px";
	}
}
new Publish ();