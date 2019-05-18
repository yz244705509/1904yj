class Play {
	constructor() {
	    this.div = document.querySelector("#div1");
		this.ul = this.div.querySelector("ul");
		this.btns = this.div.querySelector("ol").querySelectorAll("li");
		this.goPrev = this.div.querySelector("#goPrev");
		this.goNext = this.div.querySelector("#goNext");
		this.nowIndex = 0;
		this.lastIndex = 0;
		this.bindEvent();
		this.autoPlay();
	}
	
	bindEvent () {
		for (let i = 0; i < this.btns.length; i++) {
			this.btns[i].onclick = () => {
				this.nowIndex = i;
				this.change();
			}
		}
		this.goNext.onclick = this.goNextFn.bind(this);
		this.goPrev.onclick = this.goPrevFn.bind(this);
		this.div.onmouseenter = this.divEnterFn.bind(this);
		this.div.onmouseleave = this.divLeaveFn.bind(this);
	}
	divEnterFn () {
		clearInterval(this.div.timer);
	}
	divLeaveFn () {
		this.div.timer = setInterval(() => {
			this.goNext.onclick();
		},3000)
	}
	autoPlay () {
		this.div.timer = setInterval(() => {
			this.goNext.onclick();
		},3000)
	}
	goNextFn () {
		this.nowIndex++;
		if (this.nowIndex === this.btns.length) {
			this.nowIndex =0;
			this.ul.style.top = 0 +"px";
		}
		this.change();
	}
	goPrevFn () {
		this.nowIndex--;
		if (this.nowIndex < 0) {
			// console.log(this.nowIndex)
			// this.change();
			this.nowIndex = this.btns.length -1;
			this.ul.style.top = - (this.btns.length+1) * 500+"px";
		}
		// console.log(this.nowIndex);
		this.change();
	}
	change () {
		// this.btns[this.lastIndex].classList.remove("ac");
		// console.log(this.btns);
		this.btns[this.lastIndex].classList.remove("ac");
		this.btns[this.nowIndex].classList.add("ac");
		this.move(this.ul,"top",-(this.nowIndex+1) * 500);
		this.lastIndex = this.nowIndex;
	}
	move (obj,attr,end) {
		clearInterval(obj.timer);
		var start =parseInt(getComputedStyle(obj,false)[attr]);
		obj.timer = setInterval( () => {
			var distance = end - start;
			var speed = distance > 0 ? Math.ceil(distance / 10) : Math.floor(distance / 10);
			start += speed;
			obj.style[attr] = start + "px";
			if (start === end) {
				clearInterval(obj.timer);
			}
		},20)
	}
}
new Play();