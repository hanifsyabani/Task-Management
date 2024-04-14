export interface SideItem {
  name: string;
  path: string;
}

export const sideItem : SideItem[]=[
  {
    name:'All Tasks',
    path:'/',
  },
  {
    name:'Important',
    path:'/important'
  },
  {
    name:'Completed',
    path:'/completed'
  },
  {
    name:'Do it Now',
    path:'/doit'
  }
]