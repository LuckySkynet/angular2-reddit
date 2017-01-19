export class Article{
  title: string;
  link: string;
  votes: number;

  constructor(title:string,link:string,votes?:number){
    this.title = title;
    this.link = link;
    //默认值为0
    this.votes = votes || 0;
  }

  voteUp():void{
    this.votes += 1;
  }

  voteDown():void{
    this.votes -= 1;
  }

  domain():string{
    try{
      //获取url的域名
      const link = this.link.split('//')[1];
      return link.split('/')[0];
    }catch(error){
      return null;
    }
  }
}
