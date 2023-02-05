export default class Table{
    constructor(){
        this.arr = [];
        this.currentDraggedRow;
        this.currentDraggedCol;
        this.brick;
        this.row;
        this.col;
        this.element;
        this.addRowBtn = document.getElementById("add-row");
        this.addRowBtn.onclick = () => {
            this.arr[this.row] = [];
            let row = this.row;
            this.row++;
            let tr = document.createElement("tr");
            for (let j = 0; j < this.col; j++){
                let td = document.createElement("td");
                td.addEventListener("dragover", (e) =>{
                    e.preventDefault();
                    let col = j;
                    console.log(`row : ${row}, col : ${col} 에 올라옴`);
                });
                td.addEventListener("drop", (e) =>{
                    // e.preventDefault();
                    let col = j;
                    td.innerHTML="";
                    let imageElement = document.createElement("img");
                    imageElement.addEventListener("drag", (e) => {
                        e.preventDefault();
                        this.currentDraggedRow = row;
                        this.currentDraggedCol = col;
                        console.log(this.currentDraggedRow + " " + this.currentDraggedCol);
                    });

                    if (this.brick.imgWithHealth == null){
                        imageElement.setAttribute("src", this.brick.fullImg);
                    }
                    else{
                        imageElement.setAttribute("src", this.brick.imgWithHealth);
                    }
                    td.appendChild(imageElement);
                    console.log("brick type : " + this.brick.type);
                    console.log(`row : ${row}, col : ${col} 에 내려놓음`);
                    this.arr[row][col] = {type:this.brick.type,strokeImg:this.brick.strokeImg,
                                        fullImg: this.brick.fullImg, particleImg: this.brick.particleImg,health : this.brick.health};
                });
                tr.appendChild(td);
            }
            tr.setAttribute("id","row" + this.row);
            this.element.insertAdjacentElement("afterbegin", tr);
        }
        this.makeTableBtn = document.getElementById("make-table");
        this.makeTableBtn.onclick = () => {

            if(confirm("현재 작성된 모든 맵 정보가 초기화됩니다. 계속하시겠습니까?") == false){
                return;
            }

            let div = document.getElementById('custom-map');
            while (div.hasChildNodes()){
                div.firstChild.remove()
            }
            this.arr = [];
            let row = document.getElementById("table-row").value;
            this.create(row);
        }
    }
    create(row){
        let table = document.createElement("table");
        this.element = table;
        document.getElementById("custom-map").appendChild(table);
        this.col = 10;
        this.row = row;
        for(let i = 0; i < row; i++){
            let tr = document.createElement("tr");
            tr.setAttribute("id","row" + (i+1));
            table.insertAdjacentElement("afterbegin", tr);
            for (let j = 0; j < this.col; j++){
                let td = document.createElement("td");
                td.setAttribute("id","col" + (j+1));
                td.addEventListener("dragover", (e) =>{
                    e.preventDefault();
                    let row = i;
                    let col = j;
                    console.log(`row : ${row}, col : ${col} 에 올라옴`);
                });
                td.addEventListener("drop", (e) =>{
                    // e.preventDefault();
                    let row = i
                    let col = j;
                    td.innerHTML="";
                    let imageElement = document.createElement("img");
                    imageElement.addEventListener("drag", (e) => {
                        e.preventDefault();
                        this.currentDraggedRow = row;
                        this.currentDraggedCol = col;
                        // console.log(this.currentDraggedRow + " " + this.currentDraggedCol);
                    });


                    if (this.brick.imgWithHealth == null){
                        imageElement.setAttribute("src", this.brick.fullImg);
                    }
                    else{
                        imageElement.setAttribute("src", this.brick.imgWithHealth);
                    }
                    td.appendChild(imageElement);
                    console.log("brick type : " + this.brick.type);
                    console.log(`row : ${row}, col : ${col} 에 내려놓음`);
                    this.arr[row][col] = {type:this.brick.type,strokeImg:this.brick.strokeImg,
                                        fullImg: this.brick.fullImg, particleImg: this.brick.particleImg,health : this.brick.health};
                });
                tr.appendChild(td);
            }
        }
        for(let i = 0; i < row; i++){
            this.arr[i] = [];
        }
    }
}
