import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: { id: number, name: string, status: string };

  constructor(private serversService: ServersService, private route: ActivatedRoute) { }

  ngOnInit() {
    //const id = +this.route.snapshot.params['id'];
    //console.log(parseInt(this.route.snapshot.params['id']) + 1);
    this.server = this.serversService.getServer(parseInt(this.route.snapshot.params['id']));
    //this.server = this.serversService.getServer(id);
    console.log('SERVER', this.server.name);
    this.route.params.subscribe((params: Params) => {
      //console.log('params', params['id'] + 1);
      this.server = this.serversService.getServer(parseInt(params['id']));
    })
  }

}
