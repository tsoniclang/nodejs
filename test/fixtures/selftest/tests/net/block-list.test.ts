import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { BlockList } from "@tsonic/nodejs/net.js";

export class BlockListTests {
  public constructor_creates_instance(): void {
    const blockList = new BlockList();
    Assert.NotNull(blockList);
  }

  public add_address_adds_to_list(): void {
    const blockList = new BlockList();
    blockList.addAddress("192.168.1.1");

    Assert.True(blockList.check("192.168.1.1"));
  }

  public add_address_with_type_adds_to_list(): void {
    const blockList = new BlockList();
    blockList.addAddress("192.168.1.1", "ipv4");

    Assert.True(blockList.check("192.168.1.1", "ipv4"));
  }

  public check_not_blocked_returns_false(): void {
    const blockList = new BlockList();
    blockList.addAddress("192.168.1.1");

    Assert.False(blockList.check("192.168.1.2"));
  }

  public add_range_blocks_range(): void {
    const blockList = new BlockList();
    blockList.addRange("192.168.1.0", "192.168.1.255", "ipv4");

    Assert.True(blockList.check("192.168.1.100", "ipv4"));
    Assert.True(blockList.check("192.168.1.1", "ipv4"));
    Assert.True(blockList.check("192.168.1.255", "ipv4"));
    Assert.False(blockList.check("192.168.2.1", "ipv4"));
  }

  public add_subnet_blocks_subnet(): void {
    const blockList = new BlockList();
    blockList.addSubnet("192.168.1.0", 24, "ipv4");

    Assert.True(blockList.check("192.168.1.100", "ipv4"));
    Assert.True(blockList.check("192.168.1.1", "ipv4"));
    Assert.False(blockList.check("192.168.2.1", "ipv4"));
  }

  public get_rules_returns_all_rules(): void {
    const blockList = new BlockList();
    blockList.addAddress("192.168.1.1");
    blockList.addRange("10.0.0.0", "10.0.0.255", "ipv4");
    blockList.addSubnet("172.16.0.0", 16, "ipv4");

    const rules = blockList.getRules();
    Assert.True(rules.length >= 3);
  }
}

A.on(BlockListTests)
  .method((t) => t.constructor_creates_instance)
  .add(FactAttribute);
A.on(BlockListTests)
  .method((t) => t.add_address_adds_to_list)
  .add(FactAttribute);
A.on(BlockListTests)
  .method((t) => t.add_address_with_type_adds_to_list)
  .add(FactAttribute);
A.on(BlockListTests)
  .method((t) => t.check_not_blocked_returns_false)
  .add(FactAttribute);
A.on(BlockListTests)
  .method((t) => t.add_range_blocks_range)
  .add(FactAttribute);
A.on(BlockListTests)
  .method((t) => t.add_subnet_blocks_subnet)
  .add(FactAttribute);
A.on(BlockListTests)
  .method((t) => t.get_rules_returns_all_rules)
  .add(FactAttribute);
