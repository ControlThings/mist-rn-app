declare type Peer = {
  luid: Buffer,
  ruid: Buffer,
  rhid: Buffer,
  rsid: Buffer,
  protocol: string,
  online: boolean
}

declare type Identity = {
  uid: Buffer,
  alias: string,
  privkey: boolean
}